import React from 'react';
import { cn } from '@/utils/cn';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import { format } from 'date-fns';

const AttendanceGrid = ({ 
  students, 
  selectedDate, 
  attendanceData, 
  onMarkAttendance,
  className 
}) => {
  const getAttendanceStatus = (studentId) => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const record = attendanceData.find(
      a => a.studentId === studentId && a.date === dateKey
    );
    return record?.status || 'unmarked';
  };

  const handleStatusChange = (studentId, status) => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    onMarkAttendance(studentId, dateKey, status);
  };

  const statusOptions = [
    { value: 'present', label: 'Present', variant: 'present' },
    { value: 'absent', label: 'Absent', variant: 'absent' },
    { value: 'late', label: 'Late', variant: 'late' },
    { value: 'excused', label: 'Excused', variant: 'excused' }
  ];

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-display font-semibold text-gray-900">
          Attendance for {format(selectedDate, 'MMMM d, yyyy')}
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Roll Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => {
              const currentStatus = getAttendanceStatus(student.Id);
              return (
                <tr
                  key={student.Id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {student.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {student.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Grade {student.grade}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.rollNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {currentStatus === 'unmarked' ? (
                      <Badge variant="default">Not Marked</Badge>
                    ) : (
                      <Badge variant={currentStatus}>
                        {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {statusOptions.map((option) => (
                        <Button
                          key={option.value}
                          variant={currentStatus === option.value ? option.variant : 'ghost'}
                          size="sm"
                          onClick={() => handleStatusChange(student.Id, option.value)}
                          className="text-xs"
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default AttendanceGrid;