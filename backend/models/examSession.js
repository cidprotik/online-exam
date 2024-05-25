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
        countdownEndTime: {
          type: Date,
          required: true,
        },
    },
    { timestamps: true }
);

const ExamSession = mongoose.model('ExamSession', ExamSessionSchema);
export default ExamSession;