const passport = require("passport");
module.exports = (app) => {
  // Google Routes
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"),(req,res) =>{
   res.redirect("/surveys");
  });
  app.get("/api/current_user", (req, res) => {
    req.session.user = req.user;
    res.send(req.user);
  });
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });


}