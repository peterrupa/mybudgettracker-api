import { User } from '../models';
import { missingFields, resourceNotFound } from '../constants/errorTypes';

export const getCustomCategories = async (req, res, next) => {
    const { userGoogleId } = req.params;

    try {
        const user = await User.findById(userGoogleId);

        if (!user) {
            throw resourceNotFound;
        }

        const categories = await user.getCategories({
            attributes: ['id', 'name', 'icon', 'createdAt', 'updatedAt']
        });

        res.send(categories);
    } catch (e) {
        next(e);
    }
};

export const addCustomCategory = async (req, res, next) => {
    req.checkBody('name').notEmpty();
    req.checkBody('icon').notEmpty();

    try {
        const validationResult = await req.getValidationResult();

        if (!validationResult.isEmpty()) {
            throw missingFields(validationResult);
        }

        const { userGoogleId } = req.params;
        const { name, icon } = req.body;

        const user = await User.findById(userGoogleId);

        if (!user) {
            throw resourceNotFound;
        }

        const category = await user.createCategory({
            name,
            icon
        });

        res.send(category);
    } catch (e) {
        next(e);
    }
};

export const updateCustomCategory = async (req, res, next) => {
    const { userGoogleId, categoryId } = req.params;
    const { name, icon } = req.body;

    try {
        const user = await User.findById(userGoogleId);

        if (!user) {
            throw resourceNotFound;
        }

        const categories = await user.getCategories({
            where: {
                id: categoryId
            }
        });

        if (categories.length === 0) {
            throw resourceNotFound;
        }

        const category = categories[0];

        category.name = name || category.name;
        category.icon = icon || category.icon;

        const updatedCategory = await category.save();

        res.send(updatedCategory);
    } catch (e) {
        next(e);
    }
};

export const deleteCustomCategory = async (req, res, next) => {
    const { userGoogleId, categoryId } = req.params;

    try {
        const user = await User.findById(userGoogleId);

        if (!user) {
            throw resourceNotFound;
        }

        const categories = await user.getCategories({
            where: {
                id: categoryId
            }
        });

        if (categories.length === 0) {
            throw resourceNotFound;
        }

        const category = categories[0];

        await category.destroy();

        res.send(category);
    } catch (e) {
        next(e);
    }
};
