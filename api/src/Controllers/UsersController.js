import bcrypt from 'bcrypt'
import { CognitoIdentityServiceProvider } from "aws-sdk"
import { models, connection } from '../database/index.js'
import { aws } from '../services/aws.js'
import { getSecretHash } from '../utils/getSecretHash.js'

const errorMessages = {
    'NotAuthorizedException': 'Usuário ou senha incorretos.',
    'UsernameExistsException': 'Já existe uma conta com este e-mail.',
    'UserNotConfirmedException': 'Sua conta não foi confirmada. Verifique seu e-mail.',
}

class UsersController {
    async create(req, res) {
        const cognito = new CognitoIdentityServiceProvider({ region: "us-east-2" });

        // obtendo os dados enviados pelo front-end
        const { username, password, email, phone_number, birth_date } = req.body
        const imageBuffer = req.file.buffer
        const fileName = req.file.originalname
        let urlImage = null

        // criptografa a senha informada antes de salvar na base
        // const passwordEncript = await bcrypt.hash(password, 10)

        const secrethash = await getSecretHash(email)

        const params = {
            ClientId: process.env.AWS_COGNITO_CLIENT_ID,
            Username: email,
            Password: password,
            SecretHash: secrethash,
            UserAttributes: [
                { Name: "email", Value: email }
            ]
        }

        try {
            const result = await cognito.signUp(params).promise()

            await connection.transaction(async transaction => {

                if (imageBuffer) {
                    // se existir imagem anexada é realizado a chamada para o serviço aws s3 para armazenar a imagem retornando uma url
                    // que será salva na base de dados
                    const url = await aws(fileName, imageBuffer, req.file.mimeType)
                    urlImage = url
                }

                // criando o usuário na base de dados
                const { id } = await models.Users.create({
                    username,
                    email,
                    cognito_user_id: result.UserSub,
                    phone_number
                }, { transaction })

                // criando o perfil do usuário na base de dados
                await models.Profiles.create({
                    user_id: id,
                    birth_date,
                    profile_photo: urlImage
                }, { transaction })

                return res.status(200).json({ msg: 'Cadastro realizado com sucesso!!.' })
            })
        } catch (e) {
            let msg = null

            if (e.code) {
                msg = errorMessages[e.code] || 'Ocorreu um erro desconhecido. Tente novamente mais tarde.'
            }

            return res.status(401).json({ msg: msg || e.message })
        }
    }

    async login(req, res) {
        // obtendo as credenciais informada pelo usuário
        const { email, password } = req.body

        const cognito = new CognitoIdentityServiceProvider({ region: "us-east-2" })
        const secretHash = await getSecretHash(email)
        //const passwordEncript = await bcrypt.hash(password, 10)

        const params = {
            AuthFlow: "USER_PASSWORD_AUTH",
            ClientId: process.env.AWS_COGNITO_CLIENT_ID,
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password,
                SECRET_HASH: secretHash
            }
        }

        try {

            const result = await cognito.initiateAuth(params).promise()

            // buscando o usuário pelo e-mail
            const user = await models.Users.findOne({
                attributes: ['id', 'username', 'email', 'phone_number'],
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

            return res.status(200).json({
                data: {
                    usuario: user,
                    idToken: result.AuthenticationResult.IdToken
                }
            })

        } catch (e) {
            let msg = null

            if (e.code) {
                msg = errorMessages[e.code] || 'Ocorreu um erro desconhecido. Tente novamente mais tarde.'
            }

            return res.status(401).json({ msg: msg || e.message })
        }
    }

    async confirmationUSer(req, res) {
        const cognito = new CognitoIdentityServiceProvider({ region: "us-east-2" });

        const { codigo, email } = req.body
        const secretHash = await getSecretHash(email)

        const params = {
            ClientId: process.env.AWS_COGNITO_CLIENT_ID,
            Username: email, // o mesmo usado no signup
            ConfirmationCode: codigo, // código recebido por e-mail
            SecretHash: secretHash
        }

        try {
            await cognito.confirmSignUp(params).promise()
            res.status(200).json({ msg: 'ok' })

        } catch (error) {
            console.log('erro', error.message)
            res.status(400).json({ msg: error.message })
        }
    }
}

export default new UsersController()