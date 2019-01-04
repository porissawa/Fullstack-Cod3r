const {authSecret} = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        if(!req.body.email || !req.body.password) {
            return res.status(400).send('Informe usuário e senha!')
        }

        const user = app.db('users')
            .where({email: req.body.email})
            .first()
        if (!user) return res.status(400).send('Usuário não encontrado.')

        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        if(!isMatch) return res.status(401).send('Email/senha inválidos.')

        const now = Math.floor(Date.now()/1000)

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: now, //issued at
            exp: now + (60 * 60 * 24 * 3) //token vale por três dias (60 * 60 = 1h * 24h = 1 dia * 3 = 3 dias)
        }

        res.json({
            ...payload, 
            token: jwt.enconde(payload, authSecret)
        })
    }
}