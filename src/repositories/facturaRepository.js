import { db } from '../config/firebase.js'
import facturaModel from '../models/facturaModel.js'

class FacturaRepository {
  // Crear una nueva factura asociada a un usuario y cliente
  async createFactura(data) {
    const factura = await db.collection('facturas').add({
      usuarioId: data.usuarioId, // Enlace con el usuario
      clienteId: data.clienteId, // Enlace con el cliente
      nombreCliente: data.nombreCliente,
      fecha: data.fecha,
      telefono: data.telefono,
      pago: data.pago,
      total: data.total
    })
    return factura.id
  }

  // Actualizar una factura
  async updateFactura(id, data) {
    await db.collection('facturas').doc(id).update(data)
  }

  // Eliminar una factura
  async deleteFactura(id) {
    await db.collection('facturas').doc(id).delete()
  }

  // Obtener todas las facturas de un usuario
  async getFacturasByUsuario(usuarioId) {
    const docs = await db.collection('facturas').where('usuarioId', '==', usuarioId).get()
    const facturas = []
    docs.forEach((doc) => {
      const data = doc.data()
      facturas.push(new facturaModel({
        id: doc.id,
        usuarioId: data.usuarioId,
        clienteId: data.clienteId,
        fecha: data.fecha,
        telefono: data.telefono,
        pago: data.pago,
        total: data.total
      }))
    })
    return facturas
  }

  // Obtener todas las facturas de un cliente asociado a un usuario
  async getFacturasByCliente(usuarioId, clienteId) {
    const docs = await db.collection('facturas')
      .where('usuarioId', '==', usuarioId)
      .where('clienteId', '==', clienteId)
      .get()
    const facturas = []
    docs.forEach((doc) => {
      const data = doc.data()
      facturas.push(new facturaModel({
        id: doc.id,
        usuarioId: data.usuarioId,
        clienteId: data.clienteId,
        fecha: data.fecha,
        telefono: data.telefono,
        pago: data.pago,
        total: data.total
      }))
    })
    return facturas
  }

  // Obtener una factura específica por ID
  async getFacturaById(id) {
    const doc = await db.collection('facturas').doc(id).get()
    if (!doc.exists) {
      return null
    }
    const data = doc.data()
    return new facturaModel({
      id: doc.id,
      usuarioId: data.usuarioId,
      clienteId: data.clienteId,
      fecha: data.fecha,
      telefono: data.telefono,
      pago: data.pago,
      total: data.total
    })
  }
}

export default FacturaRepository
