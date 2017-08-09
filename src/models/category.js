import Sequelize from 'sequelize';

import db from '../db/db';

const attributes = {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    icon: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isDefault: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
};

const options = {};

const Category = db.define('categories', attributes, options);

export default Category;
