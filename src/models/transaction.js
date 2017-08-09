import Sequelize from 'sequelize';

import db from '../db/db';

const attributes = {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.ENUM('income', 'expense'),
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

export default Transaction;
