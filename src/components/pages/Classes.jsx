import React, { useState } from 'react';
import { useAsync } from '@/hooks/useAsync';
import { classService } from '@/services/api/classService';
import { toast } from 'react-toastify';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import SearchBar from '@/components/molecules/SearchBar';
import DataTable from '@/components/molecules/DataTable';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';

const Classes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  
  const { data: classes, loading, error, retry } = useAsync(
    classService.getAll
  );

  const handleEdit = (classItem) => {
    toast.info(`Edit functionality for ${classItem.name} - Coming soon!`);
  };

  const handleDelete = async (classItem) => {
    if (window.confirm(`Are you sure you want to delete ${classItem.name}?`)) {
      try {
        await classService.delete(classItem.Id);
        toast.success('Class deleted successfully');
        retry();
      } catch (error) {
        toast.error('Failed to delete class');
      }
    }
  };

  const handleAddClass = () => {
    toast.info('Add new class functionality - Coming soon!');
  };

  const filteredClasses = classes?.filter(classItem => {
    const matchesSearch = classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classItem.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === '' || classItem.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  }) || [];

  const subjects = [...new Set(classes?.map(c => c.subject) || [])].sort();

  const columns = [
    {
      key: 'name',
      header: 'Class Name',
      render: (value, classItem) => (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-br from-secondary to-purple-600 rounded-full flex items-center justify-center">
            <ApperIcon name="BookOpen" size={16} className="text-white" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{classItem.name}</p>
            <p className="text-sm text-gray-500">Grade {classItem.grade}, Section {classItem.section}</p>
          </div>
        </div>
      )
    },
    {
      key: 'subject',
      header: 'Subject',
      render: (value) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          {value}
        </span>
      )
    },
    {
      key: 'teacher',
      header: 'Teacher'
    },
    {
      key: 'room',
      header: 'Room',
      render: (value) => (
        <span className="text-sm font-medium text-gray-900">
          {value}
        </span>
      )
    },
    {
      key: 'studentIds',
      header: 'Students',
      render: (value) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {value?.length || 0} students
        </span>
      )
    }
  ];

  if (loading) {
    return <Loading type="table" />;
  }

  if (error) {
    return (
      <Error
        title="Failed to load classes"
        message="There was an error loading the class data. Please try again."
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
            Classes
          </h1>
          <p className="text-gray-600 mt-1">
            Manage class schedules and assignments
          </p>
        </div>
        <Button
          variant="primary"
          icon="Plus"
          onClick={handleAddClass}
          className="shadow-lg hover:shadow-xl"
        >
          Add Class
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SearchBar
              placeholder="Search by class name or teacher..."
              onSearch={setSearchTerm}
              className="md:col-span-2"
            />
            <div>
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
          </div>
        </div>
      </Card>

      {/* Classes Table */}
      <Card>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-display font-semibold text-gray-900">
                Class List
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {filteredClasses.length} of {classes?.length || 0} classes
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" icon="Download">
                Export
              </Button>
              <Button variant="ghost" size="sm" icon="Calendar">
                Schedule
              </Button>
            </div>
          </div>
        </div>
        
        {filteredClasses.length > 0 ? (
          <DataTable
            columns={columns}
            data={filteredClasses}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <Empty
            title="No classes found"
            message={searchTerm || selectedSubject ? 
              "No classes match your current filters. Try adjusting your search criteria." :
              "No classes have been created yet. Get started by adding your first class."
            }
            icon="BookOpen"
            actionLabel={!searchTerm && !selectedSubject ? "Add Class" : undefined}
            onAction={!searchTerm && !selectedSubject ? handleAddClass : undefined}
          />
        )}
      </Card>
    </div>
  );
};

export default Classes;