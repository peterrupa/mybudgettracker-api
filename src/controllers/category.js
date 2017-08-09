import { Category } from '../models';

export const getDefaultCategories = async (req, res, next) => {
    try {
        const defaultCategories = await Category.findAll({
            where: {
                isDefault: true
            },
            attributes: ['id', 'name', 'icon', 'createdAt', 'updatedAt']
        });

        res.send(defaultCategories);
    } catch (e) {
        next(e);
    }
};
