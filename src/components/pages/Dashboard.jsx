import React from 'react';
import { useAsync } from '@/hooks/useAsync';
import { studentService } from '@/services/api/studentService';
import { classService } from '@/services/api/classService';
import { attendanceService } from '@/services/api/attendanceService';
import { announcementService } from '@/services/api/announcementService';
import { scheduleService } from '@/services/api/scheduleService';
import DashboardStats from '@/components/organisms/DashboardStats';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApperIcon from '@/components/ApperIcon';
import { format } from 'date-fns';

const Dashboard = () => {
  const { data: students, loading: studentsLoading, error: studentsError } = useAsync(
    studentService.getAll
  );

  const { data: classes, loading: classesLoading, error: classesError } = useAsync(
    classService.getAll
  );

  const { data: attendanceStats, loading: attendanceLoading, error: attendanceError } = useAsync(
    attendanceService.getAttendanceStats
  );

  const { data: announcements, loading: announcementsLoading, error: announcementsError } = useAsync(
    announcementService.getRecent
  );

  const { data: todaySchedule, loading: scheduleLoading, error: scheduleError } = useAsync(
    scheduleService.getTodaySchedule
  );

  const loading = studentsLoading || classesLoading || attendanceLoading || announcementsLoading || scheduleLoading;
  const error = studentsError || classesError || attendanceError || announcementsError || scheduleError;

  if (loading) {
    return (
      <div className="space-y-8">
        <Loading type="stats" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Loading type="cards" />
          <Loading type="table" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Error
        title="Dashboard Load Error"
        message="Unable to load dashboard data. Please try again."
        onRetry={() => window.location.reload()}
      />
    );
  }

  const stats = {
    totalStudents: students?.length || 0,
    totalClasses: classes?.length || 0,
    attendanceRate: attendanceStats?.attendanceRate || 0,
    activeAnnouncements: announcements?.length || 0
  };

  return (
    <div className="space-y-8">
      {/* Dashboard Stats */}
      <DashboardStats stats={stats} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Announcements */}
        <Card className="lg:col-span-2">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-display font-semibold text-gray-900">
                Recent Announcements
              </h3>
              <Button variant="ghost" size="sm" icon="Plus">
                New
              </Button>
            </div>
          </div>
          <div className="p-6">
            {announcements && announcements.length > 0 ? (
              <div className="space-y-4">
                {announcements.slice(0, 3).map((announcement) => (
                  <div
                    key={announcement.Id}
                    className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                        <ApperIcon name="Megaphone" size={20} className="text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {announcement.title}
                        </p>
                        <Badge variant={announcement.targetAudience}>
                          {announcement.targetAudience}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {announcement.content}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {format(new Date(announcement.createdAt), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <ApperIcon name="Megaphone" size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No recent announcements</p>
              </div>
            )}
          </div>
        </Card>

        {/* Today's Schedule */}
        <Card>
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-display font-semibold text-gray-900">
              Today's Schedule
            </h3>
          </div>
          <div className="p-6">
            {todaySchedule && todaySchedule.length > 0 ? (
              <div className="space-y-4">
                {todaySchedule.slice(0, 5).map((item) => (
                  <div
                    key={item.Id}
                    className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-success to-green-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
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
            ) : (
              <div className="text-center py-8">
                <ApperIcon name="Calendar" size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No classes scheduled for today</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-display font-semibold text-gray-900">
            Quick Actions
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="flex flex-col items-center space-y-2 p-6 h-auto"
              icon="Users"
            >
              <span className="text-sm font-medium">Manage Students</span>
              <span className="text-xs text-gray-500">View and edit student records</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex flex-col items-center space-y-2 p-6 h-auto"
              icon="CheckCircle"
            >
              <span className="text-sm font-medium">Take Attendance</span>
              <span className="text-xs text-gray-500">Mark today's attendance</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex flex-col items-center space-y-2 p-6 h-auto"
              icon="GraduationCap"
            >
              <span className="text-sm font-medium">Grade Book</span>
              <span className="text-xs text-gray-500">Update student grades</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex flex-col items-center space-y-2 p-6 h-auto"
              icon="Megaphone"
            >
              <span className="text-sm font-medium">New Announcement</span>
              <span className="text-xs text-gray-500">Share important updates</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;