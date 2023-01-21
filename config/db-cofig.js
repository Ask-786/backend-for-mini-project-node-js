const mongoose = require("mongoose");

const connectDataBase = async () => {
  const localDb = process.env.DB_LOCAL;
  try {
    await mongoose.connect(localDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDataBase;
