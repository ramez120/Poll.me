if (process.env.NODE_ENV === "production") {
  // in production
  module.exports = require("./prod");
} else {
  // in development
  module.exports = require("./dev");
}

// user : myUser
// password : LZTqDSnao1qnKJKt
//mongodb+srv://myUser:LZTqDSnao1qnKJKt@emaily.hfe3m.mongodb.net/emaily?retryWrites=true&w=majority
// ID : 532621650874-s15nnvofl567o61n9oe8btqtf760ijp0.apps.googleusercontent.com
// Secret : o32bwLyyzQq5pO3z9ANsiHl9
