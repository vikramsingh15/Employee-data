const mongoose = require('mongoose');

const dbName = 'employee';

const dbUrl = process.env.dbUrl || `mongodb://localhost/${dbName}`;

const connectDb = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log(`${dbName} database running.....`);
  } catch (err) {
    console.log(err.message, "cann't connect to database");
    process.exit(1);
  }
};

module.exports = connectDb;
