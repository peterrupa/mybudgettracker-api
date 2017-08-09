import Sequelize from 'sequelize';

import db from '../db/db';

const attributes = {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.ENUM('income', 'expense', 'updateCash'),
        allowNull: false
    },
    amount: {
        type: Sequelize.DECIMAL(18, 2),
        allowNull: false
    },
    timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: () => new Date()
    }
};

const options = {};

const Transaction = db.define('transactions', attributes, options);

Transaction.afterCreate(async transaction => {
    const user = await transaction.getUser();

    const cash = await user.getCash();
    const newCashValue =
        transaction.type === 'income'
            ? cash.cashOnHand + transaction.amount
            : transaction.type === 'expense'
              ? cash.cashOnHand - transaction.amount
              : transaction.amount;

    await cash.update({
        cashOnHand: newCashValue
    });
});

export default Transaction;
