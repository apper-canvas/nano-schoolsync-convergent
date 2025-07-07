import React, { useState } from 'react';
import { useAsync } from '@/hooks/useAsync';
import { studentService } from '@/services/api/studentService';
import { toast } from 'react-toastify';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import SearchBar from '@/components/molecules/SearchBar';
import DataTable from '@/components/molecules/DataTable';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';

const Students = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  
  const { data: students, loading, error, retry } = useAsync(
    studentService.getAll
  );

  const handleEdit = (student) => {
    toast.info(`Edit functionality for ${student.name} - Coming soon!`);
  };

  const handleDelete = async (student) => {
    if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
      try {
        await studentService.delete(student.Id);
        toast.success('Student deleted successfully');
        retry();
      } catch (error) {
        toast.error('Failed to delete student');
      }
    }
  };

  const handleAddStudent = () => {
    toast.info('Add new student functionality - Coming soon!');
  };

  const filteredStudents = students?.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === '' || student.grade.toString() === selectedGrade;
    return matchesSearch && matchesGrade;
  }) || [];

  const grades = [...new Set(students?.map(s => s.grade) || [])].sort();

  const columns = [
    {
      key: 'name',
      header: 'Name',
      render: (value, student) => (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {student.name.charAt(0)}
            </span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{student.name}</p>
            <p className="text-sm text-gray-500">{student.email}</p>
          </div>
        </div>
      )
    },
    {
      key: 'rollNumber',
      header: 'Roll Number'
    },
    {
      key: 'grade',
      header: 'Grade',
      render: (value) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Grade {value}
        </span>
      )
    },
    {
      key: 'section',
      header: 'Section',
      render: (value) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Section {value}
        </span>
      )
    },
    {
      key: 'phone',
      header: 'Phone'
    }
  ];

  if (loading) {
    return <Loading type="table" />;
  }

  if (error) {
    return (
      <Error
        title="Failed to load students"
        message="There was an error loading the student data. Please try again."
        onRetry={retry}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">
            Students
          </h1>
          <p className="text-gray-600 mt-1">
            Manage student records and information
          </p>
        </div>
        <Button
          variant="primary"
          icon="Plus"
          onClick={handleAddStudent}
          className="shadow-lg hover:shadow-xl"
        >
          Add Student
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SearchBar
              placeholder="Search by name or roll number..."
              onSearch={setSearchTerm}
              className="md:col-span-2"
            />
            <div>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="">All Grades</option>
                {grades.map(grade => (
                  <option key={grade} value={grade}>
                    Grade {grade}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Students Table */}
      <Card>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-display font-semibold text-gray-900">
                Student Records
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {filteredStudents.length} of {students?.length || 0} students
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" icon="Download">
                Export
              </Button>
              <Button variant="ghost" size="sm" icon="Filter">
                Filter
              </Button>
            </div>
          </div>
        </div>
        
        {filteredStudents.length > 0 ? (
          <DataTable
            columns={columns}
            data={filteredStudents}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <Empty
            title="No students found"
            message={searchTerm || selectedGrade ? 
              "No students match your current filters. Try adjusting your search criteria." :
              "No students have been added yet. Get started by adding your first student."
            }
            icon="Users"
            actionLabel={!searchTerm && !selectedGrade ? "Add Student" : undefined}
            onAction={!searchTerm && !selectedGrade ? handleAddStudent : undefined}
          />
        )}
      </Card>
    </div>
  );
};

export default Students;