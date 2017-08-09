import Sequelize from 'sequelize';

import db from '../db/db';

const attributes = {
    cashOnHand: {
        type: Sequelize.DECIMAL(18, 2),
        allowNull: false
    },
    userGoogleId: {
        type: Sequelize.STRING,
        unique: true
    }
};

const options = {};

const Cash = db.define('cashes', attributes, options);

export default Cash;
