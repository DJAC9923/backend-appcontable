import nodeemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const transporter = nodeemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pasword: process.env.EMAIL_PASS
  }
})

export const sendPasswordResetEmail = async (email,resetUrl) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subjet: 'Restablecer Contraseña',
    html:
    `
      <p>Haga click en el siguiente enlace para restablecer contraseña
      <a href="${resetUrl}">Restablecer</a>
      </p>
    `
  })
}