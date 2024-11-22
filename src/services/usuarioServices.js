import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import UsuarioRepository from '../repositories/usuarioRepository.js'
import UsuarioModel from '../models/usuarioModel.js'
import {sendPasswordResetEmail} from '../utils/emailService.js'

const usuarioRepository = new UsuarioRepository
const secret = process.env.JWT_SECRET
const saltRound = 10

class UsuarioService {
  async  createUsuario (data,file) {
    const existUsuario =await UsuarioRepository.
    getUsuariobyUsername(data.username)
    if(existUsuario){
      throw new Error ('El Username ya existe')
    }
    const hashedPass = await bcrypt.hash(data.password,saltRound)

    const newUsuario = new UsuarioModel(
      null,
      data.nombre,
      data.apaterno,
      data.amaterno,
      data.direccion,
      data.telefono,
      data.ciudad,
      data.estado,
      data.username,
      hashedPass,
      null
    )
    
    const usuarioId= await UsuarioRepository.createUsuario(newUsuario)
    if(file){
      const image= `${usuarioId}_image.png`
      const imagePath = path.join('src','userImages',image)
      fs.writeFileSync(imagePath, file.buffer)
      await usuarioRepository.updateUsuario (usuarioId,{imagen: image})
    }
    return usuarioId
  }
  async updateUsuario(id,data,file){
    const existUsuario = await usuarioRepository.getUsuariobyId(id)
    if(!existUsuario){
      throw new Error('Usuario no encontrado')
    }
    if(data.password){
      data.password=await bcrypt.hash(data.password,saltRound)
    }
    if(file){
      const image= `${id}_image.png`
      const imagePath = path.join('src','userImages',image)
      fs.writeFileSync(imagePath, file.buffer)
      data.image=image
    }
    await usuarioRepository.updateUsuario(id,data)
  }
  async deleteUsuario(id){
    const existUsuario = await usuarioRepository
    getUsuariobyId(id)
    if(!existUsuario){
      throw new Error('Usuario no encontrado')
    }
    await usuarioRepository.deleteUsuario(id)
  }
  async getAllUsuarios(){
    return await usuarioRepository.getAllUsuarios()
  }
  async getUsuariobyId(id){
    return await usuarioRepository.getUsuariobyId(id)
  }
  async getUsuariobyUsername(usuario){
    return await usuarioRepository.getUsuariobyUsername(usuario)
  }

  async generatePasswordResetToken(usuario){
    const existUsuario = await usuarioRepository.getUsuariobyUsername(usuario)
    if(!existUsuario){
      throw new Error('Usuario no existe')
    }
    const token = jwt.sign(
      {id:existUsuario.id}, secret,{expireIn: '1h'})
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`
      await sendPasswordResetEmail(existUsuario.usuario,resetUrl)
  }
  async resetPassword(token, newPassword){
    try{
      const decoded= jwt.verify(token,secret)
      const hashedPassword= await bcrypt.hash(newPassword,saltRound)
      await usuarioRepository.updateUsuario(decoded.id,{password:hashedPassword})
    }catch(error){
      throw new Error('token Invalido o EXPIRADO')
    }
  }
}

export default EmpleadoService