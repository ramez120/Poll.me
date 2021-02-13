const keys = require("../../config/keys");
module.exports = (survey) => {
  return `
     <html>
     <body>
     <div style = "text-align : center;">
     <h3>your opinion</h3>
     <p>${survey.body}</p>
     <div>
     <a href = "${keys.redirectDomainYes}/${survey.id}/yes">yes</a>
     </div>
     <div>
     <a href = "${keys.redirectDomainNo}/${survey.id}/no">no</a>
     </div>
        </div>

     </body>
     
     
     </html>
    `;
};
