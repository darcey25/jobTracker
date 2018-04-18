const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewJobSchema = new Schema({

  userId: { type: String, required: true },
  companyName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  stage: {type: String, required: true, default: "apply"},
  cardColor: { type: String, required: true },
  titleColor: { type: String, required: true },
  info: { type: String, required: false },
  dateInfo: {type: Array},
  notes: {type: String, required: false},
  contacts: [
  	{
  		name: { type: String, required: true},
  		phoneNumber: { type: String, required: true},
  		email: {type: String, required: true}
  	}
  ],
  position: [
    {
      lat: { type: String, required: true },
      lng: { type: String, required: true }
    }
  ]
});

const NewJob = mongoose.model("NewJob", NewJobSchema);

module.exports = NewJob;
