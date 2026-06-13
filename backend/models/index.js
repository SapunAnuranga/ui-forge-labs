import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const baseOptions = {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
    },
  },
};

/* Admin Schema */
const adminSchema = new Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
}, baseOptions);
export const Admin = model('Admin', adminSchema);

/* Category Schema */
const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
}, baseOptions);
export const Category = model('Category', categorySchema);

/* Template Schema */
const templateSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, default: 'Uncategorized' },
  price: { type: Number, default: 0 },
  description: { type: String, required: true },
  icon: { type: String, default: '🌐' },
  tags: { type: [String], default: [] },
  active: { type: Boolean, default: true },
  rating: { type: Number, default: 5.0 },
  downloads: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
}, baseOptions);
export const Template = model('Template', templateSchema);

/* Message Schema */
const messageSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, default: '' },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
}, baseOptions);
export const Message = model('Message', messageSchema);

/* Order Schema */
const orderSchema = new Schema({
  templateId: { type: Schema.Types.ObjectId, ref: 'Template' },
  title: String,
  price: Number,
  sessionId: String,
  status: { type: String, default: 'pending' },
  date: { type: Date, default: Date.now },
}, baseOptions);
export const Order = model('Order', orderSchema);