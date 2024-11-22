class FacturaModel{
  constructor(id,usuarioId,ClienteId,nombreCliente,
    fecha,telefono,pago,total){
      this.id= id
      this.usuarioId =usuarioId
      this.ClienteId = ClienteId
      this.nombreCliente = nombreCliente
      this.fecha = fecha
      this.telefono = telefono
      this.pago = pago
      this.total = total
      
    }
}
export default FacturaModel