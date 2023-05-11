import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['ধান','গম','শাকসবজি', 'ফল', 'মাছ','হাঁস-মুরগি', 'গরু-ছাগল' ,'মসলা','পাট', 'অন্যান্য',],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    enum: ['কেজি', 'লিটার', 'পিস', 'বস্তা', 'বটি'],
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orders: [
    {
      customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      deliveryAddress: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ['অর্ডারকৃত', 'পেন্ডিং', 'ডেলিভারড'],
        default: 'অর্ডারকৃত',
        required: true,
      },
    },
  ],
}, { timestamps: true });
const Post = mongoose.models.Post || mongoose.model('Post',postSchema);
module.exports = Post;