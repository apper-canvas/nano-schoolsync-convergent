import React from 'react';
import { cn } from '@/utils/cn';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';

const ScheduleGrid = ({ schedule, className }) => {
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00'
  ];
  
  const weekDays = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
  ];

  const getClassForSlot = (day, time) => {
    return schedule.find(item => 
      item.day === day && item.time === time
    );
  };

  const getSubjectColor = (subject) => {
    const colors = {
      'Mathematics': 'primary',
      'Science': 'success',
      'English': 'secondary',
      'History': 'warning',
      'Art': 'error',
      'Physical Education': 'info'
    };
    return colors[subject] || 'default';
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-display font-semibold text-gray-900">
          Weekly Schedule
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50">
                Time
              </th>
              {weekDays.map((day) => (
                <th
                  key={day}
                  className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {timeSlots.map((time) => (
              <tr
                key={time}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white">
                  {time}
                </td>
                {weekDays.map((day) => {
                  const classItem = getClassForSlot(day, time);
                  return (
                    <td
                      key={`${day}-${time}`}
                      className="px-4 py-4 whitespace-nowrap text-center"
                    >
                      {classItem ? (
                        <div className="space-y-1">
                          <Badge variant={getSubjectColor(classItem.subject)}>
                            {classItem.subject}
                          </Badge>
                          <p className="text-xs text-gray-500">
                            {classItem.teacher}
                          </p>
                          <p className="text-xs text-gray-400">
                            Room {classItem.room}
                          </p>
                        </div>
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ScheduleGrid;