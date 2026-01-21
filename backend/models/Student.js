import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  grade: {
    type: String,
    required: [true, 'Grade is required'],
    enum: ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']
  },
  enrollmentDate: {
    type: String,
    required: [true, 'Enrollment date is required']
  }
}, {
  timestamps: true
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
