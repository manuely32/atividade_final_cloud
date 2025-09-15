import { models } from '../database/index.js';

class TypesController {
    async list(req, res) {
        try {
            const types = await models.Types.findAll()

            return res.status(200).json({ tipos: types })
        } catch (error) {
            return res.status(400).json({ msg: 'Erro ao obter o tipos' })
        }

    }
}

export default new TypesController()