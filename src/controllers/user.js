import { User, Category, Transaction } from '../models';
import {
    missingFields,
    resourceNotFound,
    categoryExisting,
    categoryNotExists
} from '../constants/errorTypes';

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

        // check if category name is existing as default category, if yes, disallow
        const defaultCategory = await Category.findOne({
            where: {
                name
            }
        });

        if (defaultCategory) {
            throw categoryExisting;
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

// @TODO: hide instead of delete
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

export const getTransactions = async (req, res, next) => {
    // @TODO: sync options
    const { userGoogleId } = req.params;

    try {
        const user = await User.findById(userGoogleId);

        if (!user) {
            throw resourceNotFound;
        }

        const transactions = await user.getTransactions();

        res.send(transactions);
    } catch (e) {
        next(e);
    }
};

export const addTransaction = async (req, res, next) => {
    req.checkBody('name').notEmpty();
    req.checkBody('categoryId').notEmpty();
    req.checkBody('type').notEmpty();
    req.checkBody('amount').notEmpty();

    try {
        const validationResult = await req.getValidationResult();

        if (!validationResult.isEmpty()) {
            throw missingFields(validationResult);
        }

        const { userGoogleId } = req.params;
        const { name, categoryId, type, amount, timestamp } = req.body;

        const user = await User.findById(userGoogleId);

        if (!user) {
            throw resourceNotFound;
        }

        const category = await Category.findById(categoryId);

        if (!category) {
            throw categoryNotExists;
        }

        const transaction = Transaction.build({
            name,
            type,
            amount,
            timestamp
        });

        transaction.setUser(user, { save: false });
        transaction.setCategory(category, { save: false });

        const insertedTransaction = await transaction.save();

        res.send(insertedTransaction);
    } catch (e) {
        next(e);
    }
};

export const deleteTransaction = async (req, res, next) => {
    try {
        const { userGoogleId, transactionId } = req.params;

        const user = await User.findById(userGoogleId);

        if (!user) {
            throw resourceNotFound;
        }

        const transactionArray = await user.getTransactions({
            where: {
                id: transactionId
            }
        });

        if (transactionArray.length === 0) {
            throw resourceNotFound;
        }

        const transaction = transactionArray[0];

        await transaction.destroy();

        res.send(transaction);
    } catch (e) {
        next(e);
    }
};

export const getCashOnHand = async (req, res, next) => {
    try {
        const { userGoogleId } = req.params;

        const user = await User.findById(userGoogleId);

        if (!user) {
            throw resourceNotFound;
        }

        const cashOnHand = await user.getCash();

        res.send(cashOnHand);
    } catch (e) {
        next(e);
    }
};

export const addCashOnHand = async (req, res, next) => {
    req.checkBody('cashOnHand').notEmpty();

    try {
        const validationResult = await req.getValidationResult();

        if (!validationResult.isEmpty()) {
            throw missingFields(validationResult);
        }

        const { userGoogleId } = req.params;
        const { cashOnHand } = req.body;

        const user = await User.findById(userGoogleId);

        if (!user) {
            throw resourceNotFound;
        }

        const cashOnHandInstance = await user.createCash({
            cashOnHand
        });

        res.send(cashOnHandInstance);
    } catch (e) {
        next(e);
    }
};

export const updateCashOnHand = async (req, res, next) => {
    req.checkBody('cashOnHand').notEmpty();

    try {
        const validationResult = await req.getValidationResult();

        if (!validationResult.isEmpty()) {
            throw missingFields(validationResult);
        }

        const { userGoogleId } = req.params;
        const { cashOnHand } = req.body;

        const user = await User.findById(userGoogleId);

        if (!user) {
            throw resourceNotFound;
        }

        await user.createTransaction({
            categoryId: 1,
            name: 'Edited Cash on Hand',
            type: 'updateCash',
            amount: cashOnHand
        });

        const cashOnHandInstance = await user.getCash();

        const updatedCashOnHand = await cashOnHandInstance.update({
            cashOnHand
        });

        res.send(updatedCashOnHand);
    } catch (e) {
        next(e);
    }
};
