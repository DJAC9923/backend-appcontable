import UsuarioService from '../services/usuarioService.js'
import { validationResult } from "express-validator"

const usuarioService = new UsuarioService()

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

const createUsuario = async (req, res) => {
  //handleValidationErrors(req)
  try {
    const usuarioId = await usuarioService.createUsuario(req.body)
    res.status(201).json({ success: true, usuarioId })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

const updateUsuario = async (req, res) => {
  //handleValidationErrors(req)
  try {
    const id = req.params.id
    await usuarioService.updateUsuario(id, req.body)
    res.status(200).json({ success: true })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

const deleteUsuario = async (req, res) => {
  try {
    const id = req.params.id
    await usuarioService.deleteUsuario(id)
    res.status(200).json({ success: true })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.getAllUsuarios()
    res.status(200).json({ success: true, usuarios })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

const getUsuarioById = async (req, res) => {
  //handleValidationErrors(req)
  try {
    const id = req.params.id
    const usuario = await usuarioService.getUsuarioById(id)
    if (!usuario) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' })
    }
    res.status(200).json({ success: true, usuario })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export {
  createUsuario,
  updateUsuario,
  deleteUsuario,
  getAllUsuarios,
  getUsuarioById
}
