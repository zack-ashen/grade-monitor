const { MongoClient } = require("mongodb")

const connectionString = process.env.MONGO_URI
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

let dbConnection;

module.exports = {
  connectToServer: function(callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("grade_monitor");

      console.log("Connected to MongoDB sucessfully!")

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
}