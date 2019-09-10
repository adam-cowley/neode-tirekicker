module.exports = {
    id: {
        type: 'uuid',
        primary: true,
    },
    type: 'string',
    user: {
        type: 'node',
        target: 'User',
        relationship: 'HAS_ACTION',
        direction: 'in',
    },
};