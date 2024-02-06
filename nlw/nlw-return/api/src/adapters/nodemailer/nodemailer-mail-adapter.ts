import { IMailAdapter, ISendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.USER_,
    pass: process.env.PASS
  }
});


export class NodemailerMailAdapter implements IMailAdapter {
  async sendMail({ subject, body }: ISendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget<oi@feedget.com>',
      to: 'Chrystian Santos<chrystian_santos_silva@hotmail.com>',
      subject,
      html: body
    })
  }
}