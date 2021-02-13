const keys = require("../config/keys");
const Stripe = require("stripe");
const requireLogin = require("../middlewares/requireLogin");
const stripe = Stripe(keys.stripeSecretKey);
const bodyParser = require("body-parser");
let currentUser;
module.exports = (app) => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    // get current user
    currentUser = req.user;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2000,
      currency: "usd",
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });
  // get a webhook for succeeded info
  app.post(
    "/webhook",
    bodyParser.raw({ type: "application/json" }),
    async (req, res) => {
      let event;
      try {
        event = req.body;  //test
      } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
      }
      // Handle the event
      switch (event.type) {
        case "payment_intent.succeeded": {
          res.send();
          // put user credits
          currentUser.credits += 5;
          const user = await currentUser.save();
          
          break;
        }
        default: {
          console.log(`Unhandled event type ${event.type}.`);
          res.send();
        }
      }
    }
  );
};
