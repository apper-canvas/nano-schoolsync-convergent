import React, { useState } from 'react';
import { useAsync } from '@/hooks/useAsync';
import { scheduleService } from '@/services/api/scheduleService';
import { toast } from 'react-toastify';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import ScheduleGrid from '@/components/organisms/ScheduleGrid';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';

const Schedule = () => {
  const [selectedView, setSelectedView] = useState('week');
  const [selectedDay, setSelectedDay] = useState('');
  
  const { data: schedule, loading, error, retry } = useAsync(
    scheduleService.getAll
  );

  const { data: todaySchedule, loading: todayLoading, error: todayError } = useAsync(
    scheduleService.getTodaySchedule
  );

  const handleAddClass = () => {
    toast.info('Add class to schedule functionality - Coming soon!');
  };

  const handleEditSchedule = () => {
    toast.info('Edit schedule functionality - Coming soon!');
  };

  const handleExportSchedule = () => {
    toast.info('Export schedule functionality - Coming soon!');
  };

  const filteredSchedule = schedule?.filter(item => {
    const matchesDay = selectedDay === '' || item.day === selectedDay;
    return matchesDay;
  }) || [];

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const uniqueDays = [...new Set(schedule?.map(s => s.day) || [])].sort();

  if (loading) {
    return <Loading type="table" />;
  }

  if (error) {
    return (
      <Error
        title="Failed to load schedule"
        message="There was an error loading the schedule data. Please try again."
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
            Schedule
          </h1>
          <p className="text-gray-600 mt-1">
            Manage class schedules and timetables
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            icon="Download"
            onClick={handleExportSchedule}
          >
            Export
          </Button>
          <Button
            variant="primary"
            icon="Plus"
            onClick={handleAddClass}
            className="shadow-lg hover:shadow-xl"
          >
            Add Class
          </Button>
        </div>
      </div>

      {/* View Controls */}
      <Card>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Button
                variant={selectedView === 'week' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedView('week')}
              >
                Week View
              </Button>
              <Button
                variant={selectedView === 'day' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedView('day')}
              >
                Day View
              </Button>
              <Button
                variant={selectedView === 'list' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedView('list')}
              >
                List View
              </Button>
            </div>
            
            {selectedView === 'day' && (
              <div>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Select Day</option>
                  {uniqueDays.map(day => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Today's Schedule Quick View */}
      {!todayLoading && todaySchedule && todaySchedule.length > 0 && (
        <Card>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-display font-semibold text-gray-900">
                Today's Classes
              </h3>
              <Button
                variant="ghost"
                size="sm"
                icon="Edit"
                onClick={handleEditSchedule}
              >
                Edit
              </Button>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {todaySchedule.slice(0, 6).map((item) => (
                <div
                  key={item.Id}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {item.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {item.subject}
                    </p>
                    <p className="text-sm text-gray-600">
                      {item.teacher}
                    </p>
                    <p className="text-xs text-gray-500">
                      Room {item.room}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Schedule Display */}
      {schedule && schedule.length > 0 ? (
        <>
          {selectedView === 'week' && (
            <ScheduleGrid schedule={schedule} />
          )}
          
          {selectedView === 'day' && selectedDay && (
            <Card>
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-display font-semibold text-gray-900">
                  {selectedDay} Schedule
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {filteredSchedule
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((item) => (
                      <div
                        key={item.Id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm font-bold">
                              {item.time}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-lg font-medium text-gray-900">
                              {item.subject}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {item.teacher}
                            </p>
                            <p className="text-sm text-gray-500">
                              Room {item.room}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          icon="Edit"
                          onClick={() => toast.info('Edit class functionality - Coming soon!')}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </Card>
          )}
          
          {selectedView === 'list' && (
            <Card>
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-display font-semibold text-gray-900">
                  All Classes
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Day
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Teacher
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Room
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {schedule.map((item) => (
                      <tr key={item.Id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.day}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.time}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.subject}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.teacher}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.room}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </>
      ) : (
        <Empty
          title="No schedule found"
          message="No classes have been scheduled yet. Start by adding classes to create your school timetable."
          icon="Calendar"
          actionLabel="Add Class"
          onAction={handleAddClass}
        />
      )}
    </div>
  );
};

export default Schedule;