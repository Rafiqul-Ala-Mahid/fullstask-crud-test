import Student from '../models/Student.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

// Get all students
export const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    return successResponse(res, students);
  } catch (error) {
    next(error);
  }
};

// Get single student by ID
export const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return errorResponse(res, 'Student not found', 404);
    }
    return successResponse(res, student);
  } catch (error) {
    next(error);
  }
};

// Create new student
export const createStudent = async (req, res, next) => {
  try {
    const { name, email, grade, enrollmentDate } = req.body;

    const existingStudent = await Student.findOne({ email: email.toLowerCase() });
    if (existingStudent) {
      return errorResponse(res, 'Email already exists', 400);
    }

    const student = new Student({ name, email, grade, enrollmentDate });
    await student.save();
    return successResponse(res, student, 201);
  } catch (error) {
    next(error);
  }
};

// Update student
export const updateStudent = async (req, res, next) => {
  try {
    const { name, email, grade, enrollmentDate } = req.body;

    const existingStudent = await Student.findOne({
      email: email.toLowerCase(),
      _id: { $ne: req.params.id }
    });
    if (existingStudent) {
      return errorResponse(res, 'Email already exists', 400);
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, email, grade, enrollmentDate },
      { new: true, runValidators: true }
    );

    if (!student) {
      return errorResponse(res, 'Student not found', 404);
    }
    return successResponse(res, student);
  } catch (error) {
    next(error);
  }
};

// Delete student
export const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return errorResponse(res, 'Student not found', 404);
    }
    return successResponse(res, { message: 'Student deleted successfully' });
  } catch (error) {
    next(error);
  }
};
