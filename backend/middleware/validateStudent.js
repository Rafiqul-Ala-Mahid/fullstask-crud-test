import mongoose from 'mongoose';

const validGrades = ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateStudentBody = (req, res, next) => {
  const { name, email, grade, enrollmentDate } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
  }

  if (name && name.length > 100) {
    errors.push({ field: 'name', message: 'Name must be less than 100 characters' });
  }

  if (!email || !emailRegex.test(email)) {
    errors.push({ field: 'email', message: 'Valid email is required' });
  }

  if (!grade || !validGrades.includes(grade)) {
    errors.push({ field: 'grade', message: `Grade must be one of: ${validGrades.join(', ')}` });
  }

  if (!enrollmentDate) {
    errors.push({ field: 'enrollmentDate', message: 'Enrollment date is required' });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      errors,
    });
  }

  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();

  next();
};

export const validateObjectId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid student ID format',
    });
  }

  next();
};
