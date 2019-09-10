const neode = require('neode')
    .fromEnv()
    .withDirectory(__dirname +'/models');

const faker = require('faker');

// Install schema
// neode.schema.install();

function createSomething(user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if ( !user ) return resolve();

            neode.create('Action', { user, type: faker.hacker.verb() })
                .then(resolve)
                .catch(reject)
        }, Math.floor(Math.random() * 1000) )
    });
}


function createThingsRecursively(users) {
    return Promise.all( [ ...Array(100).keys() ].map(() => {
        return createSomething( users.get( Math.floor( Math.random() * users.length - 1 ) ) )
    }) )
    .then(res => {
        console.log(res.length, 'events created at ', new Date());

        return createThingsRecursively(users)
    })
}



neode.all('User')
    .then(users => createThingsRecursively(users))
    .catch(e => {
        console.log(e)

        neode.close()
    })



