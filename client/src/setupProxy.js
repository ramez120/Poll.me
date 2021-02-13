const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports =  (app) => {
  app.use(
    ["/api", "/auth/google","/create-checkout-session"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};