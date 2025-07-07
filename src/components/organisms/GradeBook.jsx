import React from 'react';
import { cn } from '@/utils/cn';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';

const GradeBook = ({ 
  students, 
  assignments, 
  grades, 
  onGradeChange,
  className 
}) => {
  const getGrade = (studentId, assignmentId) => {
    const grade = grades.find(
      g => g.studentId === studentId && g.assignmentId === assignmentId
    );
    return grade?.score || '';
  };

  const handleGradeInput = (studentId, assignmentId, score) => {
    const numericScore = parseFloat(score);
    if (!isNaN(numericScore) || score === '') {
      onGradeChange(studentId, assignmentId, numericScore);
    }
  };

  const calculateAverage = (studentId) => {
    const studentGrades = grades.filter(g => g.studentId === studentId);
    if (studentGrades.length === 0) return '-';
    
    const total = studentGrades.reduce((sum, grade) => sum + grade.score, 0);
    const average = total / studentGrades.length;
    return average.toFixed(1);
  };

  const getLetterGrade = (average) => {
    if (average === '-') return '-';
    const num = parseFloat(average);
    if (num >= 90) return 'A';
    if (num >= 80) return 'B';
    if (num >= 70) return 'C';
    if (num >= 60) return 'D';
    return 'F';
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-display font-semibold text-gray-900">
            Grade Book
          </h3>
          <Button variant="primary" size="sm" icon="Plus">
            New Assignment
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50">
                Student
              </th>
              {assignments.map((assignment) => (
                <th
                  key={assignment.Id}
                  className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]"
                >
                  <div>
                    <p className="truncate">{assignment.title}</p>
                    <p className="text-xs text-gray-400 font-normal">
                      {assignment.totalPoints} pts
                    </p>
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Average
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Grade
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => {
              const average = calculateAverage(student.Id);
              const letterGrade = getLetterGrade(average);
              
              return (
                <tr
                  key={student.Id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-4 py-4 whitespace-nowrap sticky left-0 bg-white">
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
                          {student.rollNumber}
                        </p>
                      </div>
                    </div>
                  </td>
                  {assignments.map((assignment) => (
                    <td
                      key={assignment.Id}
                      className="px-4 py-4 whitespace-nowrap text-center"
                    >
                      <Input
                        type="number"
                        min="0"
                        max={assignment.totalPoints}
                        value={getGrade(student.Id, assignment.Id)}
                        onChange={(e) => handleGradeInput(
                          student.Id, 
                          assignment.Id, 
                          e.target.value
                        )}
                        className="w-16 text-center"
                        placeholder="0"
                      />
                    </td>
                  ))}
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    <span className="text-sm font-medium text-gray-900">
                      {average}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      letterGrade === 'A' && "bg-green-100 text-green-800",
                      letterGrade === 'B' && "bg-blue-100 text-blue-800",
                      letterGrade === 'C' && "bg-yellow-100 text-yellow-800",
                      letterGrade === 'D' && "bg-orange-100 text-orange-800",
                      letterGrade === 'F' && "bg-red-100 text-red-800",
                      letterGrade === '-' && "bg-gray-100 text-gray-800"
                    )}>
                      {letterGrade}
                    </span>
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

export default GradeBook;