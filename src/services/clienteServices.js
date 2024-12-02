import ClienteRepository from '../repositories/clienteRepository.js'
import ClienteModel from '../models/clienteModel.js'

const clienteRepository = new ClienteRepository()

class ClienteService {
  // Crear un nuevo cliente
  async createCliente(data) {
    const newCliente = new ClienteModel(
      null,
      data.nombre,
      data.apaterno,
      data.amaterno,
      data.direccion,
      data.telefono,
      data.observaciones,
      data.usuarioId
    )

    return await clienteRepository.createCliente(newCliente)
  }

  // Actualizar un cliente existente
  async updateCliente(id, data) {
    const existCliente = await clienteRepository.getClienteById(id)
    if (!existCliente) {
      throw new Error('Cliente no encontrado')
    }

    await clienteRepository.updateCliente(id, data)
  }

  // Eliminar un cliente
  async deleteCliente(id) {
    const existCliente = await clienteRepository.getClienteById(id)
    if (!existCliente) {
      throw new Error('Cliente no encontrado')
    }

    await clienteRepository.deleteCliente(id)
  }

  // Obtener todos los clientes de un usuario específico
  async getClientesByUsuario(usuarioId) {
    const clientes = await clienteRepository.getClientesByUsuario(usuarioId)
    return clientes.map(
      cliente =>
        new ClienteModel(
          cliente.id,
          cliente.nombre,
          cliente.apaterno,
          cliente.amaterno,
          cliente.direccion,
          cliente.telefono,
          cliente.observaciones,
          cliente.usuarioId
        )
    )
  }

  // Obtener un cliente específico por su ID
  async getClienteById(id) {
    const cliente = await clienteRepository.getClienteById(id)
    if (!cliente) {
      throw new Error('Cliente no encontrado')
    }
    return new ClienteModel(
      cliente.id,
      cliente.nombre,
      cliente.apaterno,
      cliente.amaterno,
      cliente.direccion,
      cliente.telefono,
      cliente.observaciones,
      cliente.usuarioId
    )
  }
}

export default ClienteService
