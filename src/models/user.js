import Sequelize from 'sequelize';

import db from '../db/db';

const attributes = {
    googleId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: false
    }
};

const options = {
    classMethods: {
        upsert({ googleId, name, photo }) {
            return this.findOne({ googleId }).then(user => {
                if (user) {
                    if (user.name !== name || user.photo !== photo) {
                        return user.update({ name, photo });
                    } else {
                        return Promise.resolve(user);
                    }
                } else {
                    return this.create({ googleId, name, photo });
                }
            });
        }
    }
};

const User = db.define('users', attributes, options);

export default User;
