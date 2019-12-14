const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

const { mailer } = require('../config');

const transport = nodemailer.createTransport(sgTransport({
    auth: {
        api_key: mailer.apiKey,
    },
}));

const sendQRCodeEmail = (qrCode, author, eventName, to) => transport.sendMail({
    from: 'info@quevent.com',
    to,
    subject: 'Quevent invitation',
    html:
    //`${author} invited you to ${eventName}. <br/> To enter the event you need to show the following QR code: <br/> <img src="cid:qrcCodecid" />`,
        `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta name="viewport" content="width=device-width" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Actionable emails e.g. reset password</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    </head>

    <body>

    <table class="body-wrap">
        <tr>
            <td></td>
            <td class="container" width="600">
                <div class="content">
                    <table class="main" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                            <td class="content-wrap">
                                <table  cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <img class="img-responsive" src="https://dana.org/wp-content/uploads/2019/10/psychedelic-treatments-consciousness-disorder-news-oct-2019.jpg"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="content-block">
                                            <h3>${eventName}</h3>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="content-block">
                                        ${author} invited you to ${eventName}.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="content-block">
                                        To enter the event you need to show the following QR code:
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="content-block aligncenter">
                                        <img src="cid:qrcCodecid" />
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <div class="footer">
                        <table width="100%">
                            <tr>
                                <td class="aligncenter content-block">You have been sent this email thanks to <a href="#">@Quevent</a>, feel free to use it anytime.</td>
                            </tr>
                        </table>
                    </div></div>
            </td>
            <td></td>
        </tr>
    </table>

    </body>
</html>
  `,
    attachments: [{
        cid: 'qrcCodecid',
        filename: 'qrCode.jpg',
        content: qrCode.split('base64,')[1],
        encoding: 'base64',
    }, ],
});


module.exports = {
    sendQRCodeEmail,
};