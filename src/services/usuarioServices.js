import UsuarioRepository from '../repositories/usuarioRepository.js'
import UsuarioModel from '../models/usuarioModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import { sendPasswordResetEmail } from '../utils/emailService.js'

const usuarioRepository = new UsuarioRepository()
const secret = process.env.JWT_SECRET
const saltRound = 10

class UsuarioService {
  async createUsuario(data, file) {
    const existUsuario = await usuarioRepository.getUsuarioByEmail(data.email)
    if (existUsuario) {
      throw new Error('El correo ya está registrado')
    }

    const hashedPass = await bcrypt.hash(data.password, saltRound)

    const newUsuario = new UsuarioModel(
      null,
      data.nombre,
      data.apaterno,
      data.amaterno,
      data.email,
      hashedPass,
      null // La imagen se procesará después si se proporciona un archivo
    )

    const usuarioId = await usuarioRepository.createUsuario(newUsuario)

    if (file) {
      const image = `${usuarioId}_image.png`
      const imagePath = path.join('src', 'userImages', image)
      fs.writeFileSync(imagePath, file.buffer)
      await usuarioRepository.updateUsuario(usuarioId, { imagen: image })
    }

    return usuarioId
  }

  async updateUsuario(id, data, file) {
    const existUsuario = await usuarioRepository.getUsuarioById(id)
    if (!existUsuario) {
      throw new Error('Usuario no encontrado')
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, saltRound)
    }

    if (file) {
      const image = `${id}_image.png`
      const imagePath = path.join('src', 'userImages', image)
      fs.writeFileSync(imagePath, file.buffer)
      data.imagen = image
    }

    await usuarioRepository.updateUsuario(id, data)
  }

  async deleteUsuario(id) {
    const existUsuario = await usuarioRepository.getUsuarioById(id)
    if (!existUsuario) {
      throw new Error('Usuario no encontrado')
    }

    await usuarioRepository.deleteUsuario(id)
  }

  async getAllUsuarios() {
    const usuarios = await usuarioRepository.getAllUsuarios()
    return usuarios.map(
      usuario =>
        new UsuarioModel(
          usuario.id,
          usuario.nombre,
          usuario.apaterno,
          usuario.amaterno,
          usuario.email,
          null, // No devolvemos la contraseña por seguridad
          usuario.imagen
        )
    )
  }

  async getUsuarioById(id) {
    const usuario = await usuarioRepository.getUsuarioById(id)
    if (!usuario) {
      throw new Error('Usuario no encontrado')
    }
    return new UsuarioModel(
      usuario.id,
      usuario.nombre,
      usuario.apaterno,
      usuario.amaterno,
      usuario.email,
      null, // No devolvemos la contraseña
      usuario.imagen
    )
  }

  async generatePasswordResetToken(email) {
    const existUsuario = await usuarioRepository.getUsuarioByEmail(email)
    if (!existUsuario) {
      throw new Error('Usuario no encontrado')
    }

    const token = jwt.sign({ id: existUsuario.id }, secret, { expiresIn: '1h' })
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`
    await sendPasswordResetEmail(existUsuario.email, resetUrl)
  }

  async resetPassword(token, newPassword) {
    try {
      const decoded = jwt.verify(token, secret)
      const hashedPassword = await bcrypt.hash(newPassword, saltRound)
      await usuarioRepository.updateUsuario(decoded.id, { password: hashedPassword })
    } catch (error) {
      throw new Error('Token inválido o expirado')
    }
  }
}

export default UsuarioService
