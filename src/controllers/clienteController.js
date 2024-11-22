import ClienteService from '../services/clienteService.js'

const clienteService = new ClienteService()

const createCliente = async (req, res) => {
  try {
    const clienteId = await clienteService.createCliente(req.body)
    res.status(201).json({ success: true, clienteId })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

const updateCliente = async (req, res) => {
  try {
    const id = req.params.id
    await clienteService.updateCliente(id, req.body)
    res.status(200).json({ success: true })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

const deleteCliente = async (req, res) => {
  try {
    const id = req.params.id
    await clienteService.deleteCliente(id)
    res.status(200).json({ success: true })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

const getClientesByUsuario = async (req, res) => {
  try {
    const usuarioId = req.params.usuarioId
    const clientes = await clienteService.getClientesByUsuario(usuarioId)
    res.status(200).json({ success: true, clientes })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

const getClienteById = async (req, res) => {
  try {
    const id = req.params.id
    const cliente = await clienteService.getClienteById(id)
    if (!cliente) {
      return res.status(404).json({ success: false, message: 'Cliente no encontrado' })
    }
    res.status(200).json({ success: true, cliente })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export {
  createCliente,
  updateCliente,
  deleteCliente,
  getClientesByUsuario,
  getClienteById
}
