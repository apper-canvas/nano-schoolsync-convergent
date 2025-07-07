import React, { useState } from 'react';
import { useAsync } from '@/hooks/useAsync';
import { studentService } from '@/services/api/studentService';
import { assignmentService } from '@/services/api/assignmentService';
import { gradeService } from '@/services/api/gradeService';
import { toast } from 'react-toastify';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import GradeBook from '@/components/organisms/GradeBook';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';

const Grades = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  
  const { data: students, loading: studentsLoading, error: studentsError, retry: retryStudents } = useAsync(
    studentService.getAll
  );

  const { data: assignments, loading: assignmentsLoading, error: assignmentsError, retry: retryAssignments } = useAsync(
    assignmentService.getAll
  );

  const { data: grades, loading: gradesLoading, error: gradesError, retry: retryGrades } = useAsync(
    gradeService.getAll
  );

  const handleGradeChange = async (studentId, assignmentId, score) => {
    try {
      await gradeService.updateGrade(studentId, assignmentId, score);
      toast.success('Grade updated successfully');
      retryGrades();
    } catch (error) {
      toast.error('Failed to update grade');
    }
  };

  const handleAddAssignment = () => {
    toast.info('Add new assignment functionality - Coming soon!');
  };

  const handleExportGrades = () => {
    toast.info('Export grades functionality - Coming soon!');
  };

  const filteredStudents = students?.filter(student => {
    // Add filtering logic based on selected class/subject if needed
    return true;
  }) || [];

  const filteredAssignments = assignments?.filter(assignment => {
    const matchesSubject = selectedSubject === '' || assignment.subject === selectedSubject;
    return matchesSubject;
  }) || [];

  const subjects = [...new Set(assignments?.map(a => a.subject) || [])].sort();

  const loading = studentsLoading || assignmentsLoading || gradesLoading;
  const error = studentsError || assignmentsError || gradesError;

  if (loading) {
    return <Loading type="table" />;
  }

  if (error) {
    return (
      <Error
        title="Failed to load grades"
        message="There was an error loading the grade data. Please try again."
        onRetry={() => {
          retryStudents();
          retryAssignments();
          retryGrades();
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">
            Grades
          </h1>
          <p className="text-gray-600 mt-1">
            Manage student grades and assignments
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            icon="Download"
            onClick={handleExportGrades}
          >
            Export
          </Button>
          <Button
            variant="primary"
            icon="Plus"
            onClick={handleAddAssignment}
            className="shadow-lg hover:shadow-xl"
          >
            New Assignment
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="">All Classes</option>
                {/* Add class options here */}
              </select>
            </div>
            <div className="flex items-end">
              <Button
                variant="ghost"
                icon="RotateCcw"
                onClick={() => {
                  setSelectedSubject('');
                  setSelectedClass('');
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Grade Statistics */}
      <Card>
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-display font-semibold text-gray-900">
            Grade Overview
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {grades?.filter(g => g.score >= 90).length || 0}
              </div>
              <p className="text-sm text-gray-600">A Grades</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {grades?.filter(g => g.score >= 80 && g.score < 90).length || 0}
              </div>
              <p className="text-sm text-gray-600">B Grades</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {grades?.filter(g => g.score >= 70 && g.score < 80).length || 0}
              </div>
              <p className="text-sm text-gray-600">C Grades</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {grades?.filter(g => g.score >= 60 && g.score < 70).length || 0}
              </div>
              <p className="text-sm text-gray-600">D Grades</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {grades?.filter(g => g.score < 60).length || 0}
              </div>
              <p className="text-sm text-gray-600">F Grades</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Grade Book */}
      {filteredStudents.length > 0 && filteredAssignments.length > 0 ? (
        <GradeBook
          students={filteredStudents}
          assignments={filteredAssignments}
          grades={grades || []}
          onGradeChange={handleGradeChange}
        />
      ) : (
        <Empty
          title="No data available"
          message={
            filteredStudents.length === 0 
              ? "No students found. Add students to start managing grades."
              : "No assignments found. Create assignments to start grading."
          }
          icon="GraduationCap"
          actionLabel={
            filteredStudents.length === 0 
              ? "Add Students" 
              : "Create Assignment"
          }
          onAction={
            filteredStudents.length === 0 
              ? () => toast.info('Add students functionality - Coming soon!')
              : handleAddAssignment
          }
        />
      )}
    </div>
  );
};

export default Grades;