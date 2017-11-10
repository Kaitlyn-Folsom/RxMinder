
var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var PatientSchema = new Schema({

   patientName: {
      type: String,
      trim: true,
      required: true
   },

   patientPhone: {
      type: String,
      unique: true,
      required: true
   },

   patientStreet: {
      type: String,
      required: true
   },

   patientCity: {
      type:String,
      required: true
   },

   patientState: {
      type:String,
      required: true
   },

   patientZip: {
      type: String,
      required: true,
      validate: [
         function(input) {
            return input.length = 5;
         }]
   },

   reminders: [
      {
      type: Schema.Types.ObjectId,
      ref: "Reminder"
      }
   ]
});
// This creates our model from the above schema, using mongoose's model method
var Patient = mongoose.model("Patient", PatientSchema);

// Export the Patient model
module.exports = Patient;