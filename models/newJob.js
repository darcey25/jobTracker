const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewJobSchema = new Schema({

  companyName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  stage: {type: String, required: true, default: "apply"},
  cardColor: { type: String, required: true },
  titleColor: { type: String, required: true },
  info: { type: String, required: true, default: "add job info here!" },
  notes: {type: String, required: true, default: "add job notes here!"},
  contacts: [
  	{
  		name: { type: String, required: true},
  		phoneNumber: { type: String, required: true},
  		email: {type: String, required: true}
  	}
  ]
});

const NewJob = mongoose.model("NewJob", NewJobSchema);

module.exports = NewJob;
