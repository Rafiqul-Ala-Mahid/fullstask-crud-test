import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, GraduationCap, Loader2 } from "lucide-react";
import { StudentTable } from "@/components/StudentTable";
import { StudentDialog } from "@/components/StudentDialog";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { Student, CreateStudentData } from "@/types/student";
import { useToast } from "@/hooks/use-toast";
import {
  useStudents,
  useCreateStudent,
  useUpdateStudent,
  useDeleteStudent,
} from "@/hooks/useStudents";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const { toast } = useToast();

  // React Query hooks
  const { data: students = [], isLoading, isError } = useStudents();
  const createMutation = useCreateStudent();
  const updateMutation = useUpdateStudent();
  const deleteMutation = useDeleteStudent();

  const filteredStudents = useMemo(() => {
    if (!searchQuery) return students;
    const query = searchQuery.toLowerCase();
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query) ||
        student.grade.toLowerCase().includes(query)
    );
  }, [students, searchQuery]);

  const handleSave = async (data: CreateStudentData & { _id?: string }) => {
    try {
      if (data._id) {
        await updateMutation.mutateAsync({
          id: data._id,
          data: {
            name: data.name,
            email: data.email,
            grade: data.grade,
            enrollmentDate: data.enrollmentDate,
          },
        });
        toast({
          title: "Student updated",
          description: `${data.name} has been updated successfully.`,
        });
      } else {
        await createMutation.mutateAsync({
          name: data.name,
          email: data.email,
          grade: data.grade,
          enrollmentDate: data.enrollmentDate,
        });
        toast({
          title: "Student added",
          description: `${data.name} has been added successfully.`,
        });
      }
      setSelectedStudent(null);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setDialogOpen(true);
  };

  const handleDeleteClick = (student: Student) => {
    setSelectedStudent(student);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedStudent) {
      try {
        await deleteMutation.mutateAsync(selectedStudent._id);
        toast({
          title: "Student deleted",
          description: `${selectedStudent.name} has been removed.`,
        });
        setSelectedStudent(null);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete student",
          variant: "destructive",
        });
      }
    }
  };

  const handleAddNew = () => {
    setSelectedStudent(null);
    setDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive text-lg">Failed to load students</p>
          <p className="text-muted-foreground">Please make sure the backend server is running</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Student Management
            </h1>
          </div>
          <p className="text-muted-foreground">
            Manage your students with ease
          </p>
        </div>

        {/* Actions Bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={handleAddNew} className="gap-2 w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            Add Student
          </Button>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total Students</p>
            <p className="text-2xl font-bold text-foreground">
              {students.length}
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Grade 9</p>
            <p className="text-2xl font-bold text-foreground">
              {students.filter((s) => s.grade === "Grade 9").length}
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Grade 10</p>
            <p className="text-2xl font-bold text-foreground">
              {students.filter((s) => s.grade === "Grade 10").length}
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Grade 11-12</p>
            <p className="text-2xl font-bold text-foreground">
              {
                students.filter(
                  (s) => s.grade === "Grade 11" || s.grade === "Grade 12"
                ).length
              }
            </p>
          </div>
        </div>

        {/* Table */}
        <StudentTable
          students={filteredStudents}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />

        {/* Dialogs */}
        <StudentDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          student={selectedStudent}
          onSave={handleSave}
        />
        <DeleteConfirmDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDeleteConfirm}
          studentName={selectedStudent?.name || ""}
        />
      </div>
    </div>
  );
};

export default Index;
