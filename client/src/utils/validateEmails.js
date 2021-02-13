const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validateEmails = (emails) => {
    // last character is comma problem handling 
  if (emails[emails.length - 1] === ",") {
    emails = emails.substr(0, emails.length - 1);
  }
  const invalidEmails = emails
    .split(",")
    .map((email) => email.trim())
    .filter((email) => emailRegEx.test(email) === false)
    .filter((email) => email.length > 0);
  if (invalidEmails.length) {
    return `invalid Emails : ${invalidEmails}`;
  }
  return;
};
export default validateEmails;
