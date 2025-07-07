import React, { useState } from 'react';
import { useAsync } from '@/hooks/useAsync';
import { studentService } from '@/services/api/studentService';
import { attendanceService } from '@/services/api/attendanceService';
import { toast } from 'react-toastify';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import AttendanceGrid from '@/components/organisms/AttendanceGrid';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { format } from 'date-fns';

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedGrade, setSelectedGrade] = useState('');
  
  const { data: students, loading: studentsLoading, error: studentsError, retry: retryStudents } = useAsync(
    studentService.getAll
  );

  const { data: attendanceData, loading: attendanceLoading, error: attendanceError, retry: retryAttendance } = useAsync(
    attendanceService.getAll
  );

  const handleMarkAttendance = async (studentId, date, status) => {
    try {
      await attendanceService.markAttendance(studentId, date, status);
      toast.success('Attendance marked successfully');
      retryAttendance();
    } catch (error) {
      toast.error('Failed to mark attendance');
    }
  };

  const handleBulkAction = (action) => {
    toast.info(`Bulk ${action} functionality - Coming soon!`);
  };

  const filteredStudents = students?.filter(student => {
    const matchesGrade = selectedGrade === '' || student.grade.toString() === selectedGrade;
    return matchesGrade;
  }) || [];

  const grades = [...new Set(students?.map(s => s.grade) || [])].sort();

  const loading = studentsLoading || attendanceLoading;
  const error = studentsError || attendanceError;

  if (loading) {
    return <Loading type="table" />;
  }

  if (error) {
    return (
      <Error
        title="Failed to load attendance data"
        message="There was an error loading the attendance information. Please try again."
        onRetry={() => {
          retryStudents();
          retryAttendance();
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
            Attendance
          </h1>
          <p className="text-gray-600 mt-1">
            Track and manage student attendance
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            icon="Download"
            onClick={() => toast.info('Export attendance functionality - Coming soon!')}
          >
            Export
          </Button>
          <Button
            variant="primary"
            icon="CheckCircle"
            onClick={() => handleBulkAction('mark all present')}
            className="shadow-lg hover:shadow-xl"
          >
            Mark All Present
          </Button>
        </div>
      </div>

      {/* Date and Filters */}
      <Card>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <input
                type="date"
                value={format(selectedDate, 'yyyy-MM-dd')}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Grade
              </label>
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
            <div>
              <Button
                variant="ghost"
                icon="RotateCcw"
                onClick={() => setSelectedDate(new Date())}
                className="w-full"
              >
                Today
              </Button>
            </div>
            <div>
              <Button
                variant="ghost"
                icon="Calendar"
                onClick={() => toast.info('Calendar view - Coming soon!')}
                className="w-full"
              >
                Calendar View
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Attendance Summary */}
      <Card>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {attendanceData?.filter(a => 
                  a.date === format(selectedDate, 'yyyy-MM-dd') && a.status === 'present'
                ).length || 0}
              </div>
              <p className="text-sm text-gray-600">Present</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {attendanceData?.filter(a => 
                  a.date === format(selectedDate, 'yyyy-MM-dd') && a.status === 'absent'
                ).length || 0}
              </div>
              <p className="text-sm text-gray-600">Absent</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {attendanceData?.filter(a => 
                  a.date === format(selectedDate, 'yyyy-MM-dd') && a.status === 'late'
                ).length || 0}
              </div>
              <p className="text-sm text-gray-600">Late</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {attendanceData?.filter(a => 
                  a.date === format(selectedDate, 'yyyy-MM-dd') && a.status === 'excused'
                ).length || 0}
              </div>
              <p className="text-sm text-gray-600">Excused</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Attendance Grid */}
      {filteredStudents.length > 0 ? (
        <AttendanceGrid
          students={filteredStudents}
          selectedDate={selectedDate}
          attendanceData={attendanceData || []}
          onMarkAttendance={handleMarkAttendance}
        />
      ) : (
        <Empty
          title="No students found"
          message={selectedGrade ? 
            "No students found for the selected grade. Try selecting a different grade." :
            "No students have been added yet. Add students to start tracking attendance."
          }
          icon="Users"
          actionLabel={!selectedGrade ? "Add Students" : undefined}
          onAction={!selectedGrade ? () => toast.info('Add students functionality - Coming soon!') : undefined}
        />
      )}
    </div>
  );
};

export default Attendance;