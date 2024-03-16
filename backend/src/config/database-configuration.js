const mongoose = require('mongoose');

const configDatabase = async (app) => {
    try {
        await mongoose.connect(process.env['DATABASE_CONNECTION'], {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
         console.log('Database connected successfully!');
     } catch (error) {
        console.log('It has an error from MongoDB client')  
        console.error(error)
        process.exit(1)
     }
}

module.exports = configDatabase;