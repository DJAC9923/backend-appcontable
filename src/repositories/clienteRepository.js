import { db } from '../config/firebase.js'
import clienteModel from '../models/clienteModel.js'

class ClienteRepository {
  // cliente asociado a un usuario
  async createCliente(data) {
    const cliente = await db.collection('clientes').add({
      nombre: data.nombre,
      apaterno: data.apaterno,
      amaterno: data.amaterno,
      direccion: data.direccion,
      telefono: data.telefono,
      observaciones: data.observaciones,
      usuarioId: data.usuarioId
    })
    return cliente.id
  }

  async updateCliente(id, data) {
    await db.collection('clientes').doc(id).update(data)
  }

  async deleteCliente(id) {
    await db.collection('clientes').doc(id).delete()
  }

  // clientes asociados a un usuario específico
  async getClientesByUsuario(usuarioId) {
    const docs = await db.collection('clientes').where('usuarioId', '==', usuarioId).get()
    const clientes = []
    docs.forEach((doc) => {
      const data = doc.data()
      clientes.push(new clienteModel(
        doc.id,
        data.nombre,
        data.apaterno,
        data.amaterno,
        data.direccion,
        data.telefono,
        data.observaciones,
      ))
    })
    return clientes
  }

  // Obtener un cliente específico por ID
  async getClienteById(id) {
    const doc = await db.collection('clientes').doc(id).get()
    if (!doc.exists) {
      return null
    }
    const data = doc.data()
    return new clienteModel(
      doc.id,
      data.nombre,
      data.apaterno,
      data.amaterno,
      data.direccion,
      data.telefono,
      data.ciudad,
      data.estado,
      data.usuarioId
    )
  }
}

export default ClienteRepository
