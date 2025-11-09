import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true, trim: true },
  hsn: { type: String, required: true, trim: true },
  retailMrp: { type: Number, required: true, min: 0 },
  wholesaleMrp: { type: Number, required: true, min: 0 },
  imageBase64: { type: String, default: "" },
}, { timestamps: true });

export type ProductType = {
  _id?: string;
  name: string;
  hsn: string;
  retailMrp: number;
  wholesaleMrp: number;
  imageBase64?: string;
};
export default models.Product || model("Product", ProductSchema);
