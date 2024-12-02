class FacturaInterface {
  createFactura(data) {}
  updateFactura(id, data) {}
  deleteFactura(id) {}
  getFacturasByUsuario(usuarioId) {} // Obtener facturas por usuario
  getFacturasByCliente(usuarioId, clienteId) {} // Obtener facturas por cliente asociado a un usuario
  getFacturaById(id) {}
}

export default FacturaInterface
