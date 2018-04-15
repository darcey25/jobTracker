const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewJobSchema = new Schema({

  companyName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  cardColor: { type: String, required: true },
  titleColor: { type: String, required: true },
  info: { type: String, required: true, default: "add job info here!" },
});

const NewJob = mongoose.model("NewJob", NewJobSchema);

module.exports = NewJob;
