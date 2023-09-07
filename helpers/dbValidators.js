const Rol = require('../models/rol')
const User = require('../models/user')

const isEmailRegistered = async (email = '') => {
    const existEmail = await User.findOne({ email })

    if (existEmail) throw new Error(`email ${email} already registered`)
}

const isValidRol = async (rol) => {
    if (rol) {
        const existRol = await Rol.findOne({ rol })
    
        if (!existRol) throw new Error(`rol ${rol} not allowed`)
    }
}

const isValidUserId = async (id = '') => {
    const existUser = await User.findById({ id })

    if (!existUser) throw new Error(`id ${id} not exists`)
}

module.exports = {
    isEmailRegistered,
    isValidRol,
    isValidUserId
}