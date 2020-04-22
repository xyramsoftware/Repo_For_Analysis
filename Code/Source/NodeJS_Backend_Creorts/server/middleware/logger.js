const {
    createLogger,
    transports,
    format
} = require('winston');
require('winston-mongodb');
const logger = createLogger({
    transports: [
        new transports.File({
            filename: 'CreortsLogs.log',
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.MongoDB({
            level: 'error',
            db:' mongodb://root:password@localhost:27017/ISFK2020',
            options: {
                useUnifiedTopology: true
            },
            format: format.combine(format.timestamp(), format.json())
        })
    ]
})

module.exports = logger;