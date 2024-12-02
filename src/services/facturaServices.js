import FacturaRepository from '../repositories/facturaRepository.js'
import FacturaModel from '../models/facturaModel.js'

const facturaRepository = new FacturaRepository()

class FacturaService {
  async createFactura(data) {
    const newFactura = new FacturaModel({
      id: null,
      usuarioId: data.usuarioId,
      clienteId: data.clienteId,
      nombreCliente: data.nombreCliente,
      fecha: data.fecha,
      telefono: data.telefono,
      pago: data.pago,
      total: data.total
    })

    return await facturaRepository.createFactura(newFactura)
  }

  async updateFactura(id, data) {
    const existFactura = await facturaRepository.getFacturaById(id)
    if (!existFactura) {
      throw new Error('Factura no encontrada')
    }

    await facturaRepository.updateFactura(id, data)
  }

  async deleteFactura(id) {
    const existFactura = await facturaRepository.getFacturaById(id)
    if (!existFactura) {
      throw new Error('Factura no encontrada')
    }

    await facturaRepository.deleteFactura(id)
  }

  async getFacturasByUsuario(usuarioId) {
    return await facturaRepository.getFacturasByUsuario(usuarioId)
  }

  async getFacturasByCliente(usuarioId, clienteId) {
    return await facturaRepository.getFacturasByCliente(usuarioId, clienteId)
  }

  async getFacturaById(id) {
    return await facturaRepository.getFacturaById(id)
  }
}

export default FacturaService
