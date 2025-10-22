import { models } from '../database/index.js';
import { aws } from '../services/aws.js';

class CollectionsController {
    async list(req, res) {
        // obterm o id do usuario que veio na requisição
        const user_id = req.query.user_id
        // busca na base dados todos as coleções cadastradas pelo usuário
        const collectionList = await models.Collections.findAll({
            where: {
                user_id
            }
        })
        // retorna a lista de coleções para o front-end
        return res.status(200).json(collectionList)
    }

    async create(req, res) {
        // obtendo os dados da coleção enviados pelo front-end
        const { usuarioId, tipo, titulo, descricao, ano, autor, categoria } = req.body

        const imageBuffer = req.file.buffer
        const fileName = req.file.originalname
        const mimeType = req.file.mimeType
        let urlImage = null

        try {
            if (imageBuffer) {
                // caso tenha imagem é chamado o serviço aws s3 para armazenar a mesma, retornando somente a url para armazenar na base da dados
                const url = await aws(fileName, imageBuffer, mimeType)
                urlImage = url
            }
            // criado uma nova coleção da base de dados
            const newCollection = await models.Collections.create({
                user_id: usuarioId,
                type_id: tipo,
                title: titulo,
                description: descricao,
                release_year: ano || null,
                author: autor,
                category_id: categoria,
                image: urlImage
            })
            //retornando os dados da coleção criada
            return res.status(200).json(newCollection)
        } catch (e) {
            // caso ocorra erro, é retornado uma mensagem de erro para o front-end
            return res.status(401).json({ msg: e.message })
        }
    }

    async show(req, res) {
        const { id } = req.params

        try {
            const collection = await models.Collections.findByPk(id, {
                attributes: ['id', 'user_id', 'title', 'description', 'author', 'release_year', 'image'],
                include: [
                    {
                        model: models.Category,
                        as: 'category',
                        attributes: ['id', 'description']
                    },
                    {
                        model: models.Types,
                        as: 'type',
                        attributes: ['id', 'description']
                    },

                ]
            })

            return res.status(200).json(collection)
        } catch (e) {
            console.log(e)
            return res.status(401).json({ msg: e.message })
        }
    }

    async update(req, res) {
        const { id } = req.params
        const { usuarioId, tipo, titulo, descricao, ano, autor, categoria } = req.body

        console.log(id, usuarioId, tipo, titulo)

        const imageBuffer = req.file?.buffer
        const fileName = req.file?.originalname
        const mimeType = req.file?.mimeType
        let urlImage = null

        try {
            if (imageBuffer) {
                // caso tenha imagem é chamado o serviço aws s3 para armazenar a mesma, retornando somente a url para armazenar na base da dados
                const url = await aws(fileName, imageBuffer, mimeType)
                urlImage = url
            }

            const collection = await models.Collections.update({
                user_id: usuarioId,
                type_id: tipo,
                title: titulo,
                description: descricao,
                release_year: ano || null,
                author: autor,
                category_id: categoria,
                image: urlImage
            }, {
                where: {
                    id
                }
            })

            return res.status(200).json(collection)
        } catch (e) {
            return res.status(401).json({ msg: e.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params

        try {
            await models.Collections.destroy({
                where: {
                    id
                }
            })

            return res.status(200).json('ok')
        } catch (e) {
            return res.status(401).json({ msg: e.message })
        }

    }
}

export default new CollectionsController()