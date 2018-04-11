const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewJobSchema = new Schema({
  
  companyName: { type: String, required: true },
  jobTitle: { type: String, required: true }
});

const NewJob = mongoose.model("NewJob", NewJobSchema);

module.exports = NewJob;