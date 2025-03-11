import { models } from '../database/index.js';

class CollectionController {
    async list(req, res) {
        const { user } = req.params

        const collectionList = await models.Collection.findAll({
            where: {
                user_id: user
            }
        })

        return res.status(200).json(collectionList)
    }

    async create(req, res) {
        const { user, type, title, description, image } = req.body

        try {
            const newCollection = await models.Collection.create({
                user_id: user,
                type_id: type,
                title,
                description,
                image
            })

            return res.status(200).json(newCollection)
        } catch (e) {
            return res.status(401).json({ msg: e.message })
        }

    }

    async show(req, res) {
        const id = req.params

        try {
            const collection = await models.Collection.findByPk(id)

            return res.status(200).json(collection)
        } catch (e) {
            return res.status(401).json({ msg: e.message })
        }
    }

    async update() {
        const id = req.params
        const { title, description, image } = req.body

        try {
            const collection = await models.Collection.update({
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

export default new CollectionController()