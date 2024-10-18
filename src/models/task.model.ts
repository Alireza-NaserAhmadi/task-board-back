import mongoose, { Schema, Document } from 'mongoose';

interface ITask extends Document {
  title: string;
  description: string;
  completed: boolean;
  orderId: number;
}

const taskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  order: { type: Number, required: true },
}, { timestamps: { createdAt: true, updatedAt: false } });



const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
