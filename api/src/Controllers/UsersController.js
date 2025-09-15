import bcrypt from 'bcrypt'
import { models, connection } from '../database/index.js'
import { aws } from '../services/aws.js'


class UsersController {
    async register(req, res) {

        const { username, password, email, phone_number, birth_date } = req.body
        const imageBuffer = req.file.buffer
        const fileName = req.file.originalname
        let urlImage = null

        const passwordEncript = await bcrypt.hash(password, 10)

        try {
            await connection.transaction(async transaction => {
                const usuario = await models.Users.findOne({
                    where: {
                        email
                    },
                    transaction
                })

                if (!usuario) {

                    if (imageBuffer) {
                        const url = await aws(fileName, imageBuffer, req.file.mimeType)
                        urlImage = url
                    }

                    const { id } = await models.Users.create({
                        username,
                        email,
                        password: passwordEncript,
                        phone_number
                    }, { transaction })

                    await models.Profiles.create({
                        user_id: id,
                        birth_date,
                        profile_photo: urlImage
                    }, { transaction })

                    return res.status(200).json({ msg: 'Cadastro realizado com sucesso!!.' })
                } else {
                    return res.status(400).json({ msg: 'Já existe um usuário cadastrado com esse e-mail.' })
                }
            })
        } catch (e) {
            console.log('erro', e.message)
            return res.status(401).json({ msg: e.message })
        }
    }

    async login(req, res) {
        const { email, password } = req.body

        try {
            const user = await models.Users.findOne({
                attributes: ['id', 'username', 'email', 'password', 'phone_number'],
                where: {
                    email
                },
                include: [
                    {
                        model: models.Profiles,
                        as: 'profile',
                        attributes: ['birth_date', 'profile_photo']
                    }
                ]
            })

            if (!user) {
                return res.status(400).json({ msg: "Usuario não encontrado!" })
            }

            const result = await bcrypt.compare(password, user.dataValues.password)

            if (result) {

                delete user.dataValues.password

                return res.status(200).json({ usuario: user })
            } else {
                return res.status(401).json({ msg: "Senha Incorreta!" })
            }
        } catch (e) {
            console.log(e)
            return res.status(400).json({ msg: e })
        }
    }
}

export default new UsersController()