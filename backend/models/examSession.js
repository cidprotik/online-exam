import mongoose from "mongoose";

const ExamSessionSchema = new mongoose.Schema(
    {
        userId: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
          required: true,
        },
        examId: {
          type: mongoose.Schema.ObjectId,
          ref: 'Exam',
          required: true,
        },
        storedEndTime: {
          type: Number,
          required: true,
        },
        remainingTime: {
          type: Number,
          default: null,
        },
    },
    { timestamps: true }
);

const ExamSession = mongoose.model('ExamSession', ExamSessionSchema);
export default ExamSession;