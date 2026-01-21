import { Student, CreateStudentData } from '@/types/student';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  const result: ApiResponse<T> = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || 'An error occurred');
  }

  return result.data;
};

// Get all students
export const fetchStudents = async (): Promise<Student[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/students`);
    return handleResponse<Student[]>(response);
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Network error - unable to reach server');
    }
    throw error;
  }
};

// Get single student
export const fetchStudentById = async (id: string): Promise<Student> => {
  const response = await fetch(`${API_BASE_URL}/students/${id}`);
  return handleResponse<Student>(response);
};

// Create student
export const createStudent = async (data: CreateStudentData): Promise<Student> => {
  const response = await fetch(`${API_BASE_URL}/students`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse<Student>(response);
};

// Update student
export const updateStudent = async (id: string, data: CreateStudentData): Promise<Student> => {
  const response = await fetch(`${API_BASE_URL}/students/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse<Student>(response);
};

// Delete student
export const deleteStudent = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/students/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.error || 'Failed to delete student');
  }
};
