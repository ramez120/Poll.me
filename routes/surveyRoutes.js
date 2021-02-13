const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");
const _ = require("lodash");
const { URL } = require("url");
const { Path } = require("path-parser");

const reqireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
module.exports = (app) => {
  app.get("/api/surveys", reqireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    });
    res.send(surveys);
  });
  app.post("/api/surveys/webhook", (req, res) => {
    res.send({});

    const p = new Path("/surveys/:surveyId/:choice");

    const events = _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test((new URL(url).pathname));
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqWith((a, b) => a.email === b.email && a.surveyId === b.surveyId)
      .each(({ surveyId, choice, email }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: {
                email: email,
                responded: false,
              },
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: {
              "recipients.$.responded": true,
            },
          }
        ).exec();
      })
      .value();
    console.log(events);
  });
  app.post("/api/surveys", reqireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    // get survey data
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(",")
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });
    // send email
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();

      // save survey
      await survey.save();

      // subtract user credits
      req.user.credits -= 5;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
