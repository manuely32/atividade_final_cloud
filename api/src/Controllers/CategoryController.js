import { models } from '../database/index.js';

class CategoryController {
    async list(req, res) {
        try {
            const categoria = await models.Category.findAll()

            return res.status(200).json({ categorias: categoria })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ msg: 'Erro ao obter as categorias' })
        }

    }
}

export default new CategoryController()