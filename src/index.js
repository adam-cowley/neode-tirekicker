const neode = require('neode')
    .fromEnv()
    .withDirectory(__dirname +'/models');

const faker = require('faker');

// Install schema
// neode.schema.install();

function createSomething(user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            neode.create('Action', { user, type: faker.hacker.verb() })
                .then(action => {
                    console.log(action.id())

                    resolve(action);
                })
                .catch(reject)
        }, Math.floor(Math.random() * 1000) )
    });
}



neode.all('User')
    .then(users => {
        return Promise.all( [ ...Array(1000).keys() ].map(() => {
            return createSomething( users.get( Math.floor( Math.random() * users.length ) ) )
        }) )
    })
    .catch(e => {
        console.log(e)
        neode.close()
    })



