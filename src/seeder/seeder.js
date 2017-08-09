import fs from 'fs-promise';

import { log } from '../util/logger';

// read json file

log('Seed', 'Reading mock data file started.');

fs
    .readFile(__dirname + '/mock_data.json', 'utf-8')
    // .then(contents => {
    //     mockData = JSON.parse(contents);

    //     log('Seed', 'Reading mock data file done.');

    //     log('Seed', 'Inserting into database.');

    //     return User.createUsers(mockData.users);
    // })
    .then(() => {
        log('Seed', 'Inserted into database.');
        log('Seed', 'Seeding successful.');
    })
    .catch(err => {
        log('Error', err);
        log('Seed', 'Seeding failed.');
    });
