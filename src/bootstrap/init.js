import fs from 'fs-promise';
import _ from 'lodash';

import db from '../db/db';
import * as Models from '../models'; // eslint-disable-line no-unused-vars

export const init = async () => {
    // sync ORM to db
    await db.sync({ force: false });

    const file = await fs.readJSON(
        `${__dirname}/../seeder/default_categories.json`
    );

    const existingCategories = await Models.Category.findAll({
        where: {
            isDefault: true
        }
    });

    const defaultCategoriesToInsert = file.defaultCategories
        .filter(c => !_.find(existingCategories, { name: c.name }))
        .map(c => ({
            ...c,
            isDefault: true
        }));

    Models.Category.bulkCreate(defaultCategoriesToInsert);

    const defaultCategoriesToUpdate = file.defaultCategories.filter(c =>
        _.find(existingCategories, { name: c.name })
    );

    defaultCategoriesToUpdate.forEach(c => {
        Models.Category.update(c, {
            where: {
                name: c.name,
                isDefault: true
            }
        });
    });
};
