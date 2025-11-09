import { Schema, model, models } from "mongoose";
const EnquirySchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, trim: true },
  phone: { type: String, trim: true },
  message: { type: String, required: true, trim: true },
}, { timestamps: true });
export default models.Enquiry || model("Enquiry", EnquirySchema);
