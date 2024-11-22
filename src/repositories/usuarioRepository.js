import {db} from '../config/firebase.js'
import UsuarioModel from '../models/usuarioModel.js'

class UsuarioRepository{
  async createUsuario(data){
    const usuario = await db.collection('usuarios').add({
      nombre: data.nombre,
      apaterno: data.apaterno,
      amaterno: data.amaterno,
      email: data.email,
      password: data.password,
      imagen: data.imagen
    })
    return usuario.id
  }
  async updateUsuario(id,data){
    await db.collection('usuarios').doc(id).update(data)
  }
  async deleteUsuario(id){
    await db.collection('usuarios').doc(id).delete()
  }
  async getAllUsuarios(){
    const docs= await db.collection('usuarios').get()
    const usuariosapp= []
    docs.forEach((doc)=>{
      const data = doc.data()
      usuariosapp.push(new UsuarioModel(
        doc.id,
        data.nombre,
        data.email,
        data.password,
        data.imagen
      ))
    })
    return usuariosapp
  }
  async getUsuariobyId(id){
    const doc = await db.collection('usuarios').doc(id).get()
    if(!doc.exist){
      return null
    }
    const data =doc.data()
    return new UsuarioModel(
      doc.id,
      data.nombre,
      data.apaterno,
      data.amaterno,
      data.email,
      data.password,
      data.imagen
    )
  }
  async getUsuariobyUsername(email){
    const usuario = db.collection('usuario').where('email','==',email).get()
    if(!usuario.empty){
      return null
    }
    const doc= usuario.docs[0]
    const data = doc.data
    return new UsuarioModel(
      doc.id,
      data.nombre,
      data.apaterno,
      data.amaterno,
      data.email,
      data.password,
      data.imagen
    )
  }
}

export default UsuarioRepository