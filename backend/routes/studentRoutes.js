import express from 'express';
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} from '../controllers/studentController.js';
import { validateStudentBody, validateObjectId } from '../middleware/validateStudent.js';

const router = express.Router();

// GET /api/students - Get all students
router.get('/', getAllStudents);

// GET /api/students/:id - Get single student
router.get('/:id', validateObjectId, getStudentById);

// POST /api/students - Create new student
router.post('/', validateStudentBody, createStudent);

// PUT /api/students/:id - Update student
router.put('/:id', validateObjectId, validateStudentBody, updateStudent);

// DELETE /api/students/:id - Delete student
router.delete('/:id', validateObjectId, deleteStudent);

export default router;
