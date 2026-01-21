export interface Student {
  _id: string;
  name: string;
  email: string;
  grade: string;
  enrollmentDate: string;
}

export interface CreateStudentData {
  name: string;
  email: string;
  grade: string;
  enrollmentDate: string;
}
