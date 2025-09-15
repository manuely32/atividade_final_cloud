import { models } from '../database/index.js';
import { aws } from '../services/aws.js';

class CollectionsController {
    async list(req, res) {
        const user_id = req.query.user_id

        const collectionList = await models.Collections.findAll({
            where: {
                user_id
            }
        })

        return res.status(200).json(collectionList)
    }

    async create(req, res) {
        const { user, type, title, description, year, author, category } = req.body

        const imageBuffer = req.file.buffer
        const fileName = req.file.originalname
        const mimeType = req.file.mimeType
        let urlImage = null

        try {
            if (imageBuffer) {
                const url = await aws(fileName, imageBuffer, mimeType)
                urlImage = url
            }
            const newCollection = await models.Collections.create({
                user_id: user,
                type_id: type,
                title,
                description,
                release_year: year || null,
                author,
                category_id: category,
                image: urlImage
            })

            return res.status(200).json(newCollection)
        } catch (e) {
            console.log(e)
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

    async update() {
        const id = req.params
        const { title, description, image } = req.body

        try {
            const collection = await models.Collections.update({
                title,
                description,
                image
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

    async delete() {

    }
}

export default new CollectionsController()