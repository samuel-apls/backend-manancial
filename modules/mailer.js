import nodemailer from "nodemailer";
import path from "path";
import hbs from "nodemailer-express-handlebars";

const port = parseInt(process.env.EMAIL_SMTP_PORT);
const transport = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP_HOST,
    port: port,
    auth: {
      user: process.env.EMAIL_SMTP_USER,
      pass: process.env.EMAIL_SMTP_PASS,
    }
});

transport.use("compile", hbs({
    viewEngine: {
      extName: '.html',
      partialsDir: path.resolve('./resources/mail/auth/'),
      layoutsDir: path.resolve('./resources/mail/auth/'),
      defaultLayout: 'forgotPassword.html',
    },
    viewPath: path.resolve("./resources/mail/"),
    extName: ".html",
}));

export default transport;