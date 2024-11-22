import FacturaService from '../services/facturaService.js'

const facturaService = new FacturaService()

const createFactura = async (req, res) => {
  try {
    const facturaId = await facturaService.createFactura(req.body)
    res.status(201).json({ success: true, facturaId })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

const updateFactura = async (req, res) => {
  try {
    const id = req.params.id
    await facturaService.updateFactura(id, req.body)
    res.status(200).json({ success: true })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

const deleteFactura = async (req, res) => {
  try {
    const id = req.params.id
    await facturaService.deleteFactura(id)
    res.status(200).json({ success: true })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

const getFacturasByUsuario = async (req, res) => {
  try {
    const usuarioId = req.params.usuarioId
    const facturas = await facturaService.getFacturasByUsuario(usuarioId)
    res.status(200).json({ success: true, facturas })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

const getFacturasByCliente = async (req, res) => {
  try {
    const { usuarioId, clienteId } = req.params
    const facturas = await facturaService.getFacturasByCliente(usuarioId, clienteId)
    res.status(200).json({ success: true, facturas })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export {
  createFactura,
  updateFactura,
  deleteFactura,
  getFacturasByUsuario,
  getFacturasByCliente
}
