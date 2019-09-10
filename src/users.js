const neode = require('neode')
    .fromEnv()
    .withDirectory(__dirname +'/models');

const faker = require('faker');

// Install schema
// neode.schema.install();

const arr = [... Array(300).keys() ];

Promise.all( arr.map(row => {
    return neode.create('User', { name: faker.name.findName() })
}) )

// neode.create('User', { name: faker.name.findName() })
//     .then(user => users.push(user))
    .then(res => console.log('ok', res.length))
    .catch(e => console.log(e))
    .then(() => neode.close())