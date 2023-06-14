const email = require("emailjs");

const sendEmail = (CODE, gmail) => {
    let server = email.server.connect({
        user: "tranleconghau772001@gmail.com",
        password: "tlijunjusncpyivw",
        host: "smtp.gmail.com",
        ssl: true
    });

    // send the message and get a callback with an error or details of the message that was sent
    server.send({
        from: "tranleconghau772001@gmail.com",
        to: gmail,
        subject: "RESET PASSWORD",
        attachment: [
            {
                data: `<html>The email is send by <span style="font-weight:boild;color:#c68e17">FASHION SHOP</span>. <br><span >OPT</span>: <span style="font-weight:bold;color:blue">${CODE}</span> </html>`,
                alternative: true
            }
        ],
    }, function (err) { console.log(err || "Send email successfully!"); });

}
module.exports = sendEmail