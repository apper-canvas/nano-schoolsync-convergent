import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import FormField from '@/components/molecules/FormField';
import ApperIcon from '@/components/ApperIcon';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('school');
  const [schoolSettings, setSchoolSettings] = useState({
    name: 'Springfield Elementary School',
    address: '123 Education Lane, Springfield, IL 62701',
    phone: '(555) 123-4567',
    email: 'info@springfieldelementary.edu',
    website: 'www.springfieldelementary.edu',
    principal: 'Dr. Sarah Mitchell',
    academicYear: '2024-2025'
  });

  const [systemSettings, setSystemSettings] = useState({
    timezone: 'America/Chicago',
    language: 'en',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12',
    enableNotifications: true,
    enableEmailAlerts: true,
    autoBackup: true
  });

  const [gradeSettings, setGradeSettings] = useState({
    gradingScale: 'standard',
    passingGrade: 60,
    enableWeightedGrades: false,
    allowLateSubmissions: true,
    defaultAssignmentPoints: 100
  });

  const handleSaveSettings = (type) => {
    toast.success(`${type} settings saved successfully!`);
  };

  const handleResetSettings = (type) => {
    if (window.confirm(`Are you sure you want to reset ${type} settings to default?`)) {
      toast.info(`${type} settings reset to default values`);
    }
  };

  const tabs = [
    { id: 'school', label: 'School Information', icon: 'Building' },
    { id: 'system', label: 'System Settings', icon: 'Settings' },
    { id: 'grading', label: 'Grading Settings', icon: 'GraduationCap' },
    { id: 'users', label: 'User Management', icon: 'Users' },
    { id: 'backup', label: 'Backup & Security', icon: 'Shield' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900">
          Settings
        </h1>
        <p className="text-gray-600 mt-1">
          Configure your school management system
        </p>
      </div>

      {/* Tabs */}
      <Card>
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <ApperIcon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'school' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
                  School Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="School Name"
                    value={schoolSettings.name}
                    onChange={(e) => setSchoolSettings({...schoolSettings, name: e.target.value})}
                    required
                  />
                  <FormField
                    label="Principal"
                    value={schoolSettings.principal}
                    onChange={(e) => setSchoolSettings({...schoolSettings, principal: e.target.value})}
                  />
                  <FormField
                    label="Address"
                    value={schoolSettings.address}
                    onChange={(e) => setSchoolSettings({...schoolSettings, address: e.target.value})}
                    className="md:col-span-2"
                  />
                  <FormField
                    label="Phone"
                    type="tel"
                    value={schoolSettings.phone}
                    onChange={(e) => setSchoolSettings({...schoolSettings, phone: e.target.value})}
                  />
                  <FormField
                    label="Email"
                    type="email"
                    value={schoolSettings.email}
                    onChange={(e) => setSchoolSettings({...schoolSettings, email: e.target.value})}
                  />
                  <FormField
                    label="Website"
                    value={schoolSettings.website}
                    onChange={(e) => setSchoolSettings({...schoolSettings, website: e.target.value})}
                  />
                  <FormField
                    label="Academic Year"
                    value={schoolSettings.academicYear}
                    onChange={(e) => setSchoolSettings({...schoolSettings, academicYear: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="primary"
                  onClick={() => handleSaveSettings('school')}
                  icon="Save"
                >
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleResetSettings('school')}
                  icon="RotateCcw"
                >
                  Reset to Default
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
                  System Configuration
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Timezone"
                    type="select"
                    value={systemSettings.timezone}
                    onChange={(e) => setSystemSettings({...systemSettings, timezone: e.target.value})}
                    options={[
                      { value: 'America/Chicago', label: 'Central Time (CT)' },
                      { value: 'America/New_York', label: 'Eastern Time (ET)' },
                      { value: 'America/Denver', label: 'Mountain Time (MT)' },
                      { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' }
                    ]}
                  />
                  <FormField
                    label="Language"
                    type="select"
                    value={systemSettings.language}
                    onChange={(e) => setSystemSettings({...systemSettings, language: e.target.value})}
                    options={[
                      { value: 'en', label: 'English' },
                      { value: 'es', label: 'Spanish' },
                      { value: 'fr', label: 'French' }
                    ]}
                  />
                  <FormField
                    label="Date Format"
                    type="select"
                    value={systemSettings.dateFormat}
                    onChange={(e) => setSystemSettings({...systemSettings, dateFormat: e.target.value})}
                    options={[
                      { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
                      { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
                      { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
                    ]}
                  />
                  <FormField
                    label="Time Format"
                    type="select"
                    value={systemSettings.timeFormat}
                    onChange={(e) => setSystemSettings({...systemSettings, timeFormat: e.target.value})}
                    options={[
                      { value: '12', label: '12-hour (AM/PM)' },
                      { value: '24', label: '24-hour' }
                    ]}
                  />
                </div>

                <div className="mt-6 space-y-4">
                  <h4 className="text-md font-medium text-gray-900">Notifications</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={systemSettings.enableNotifications}
                        onChange={(e) => setSystemSettings({...systemSettings, enableNotifications: e.target.checked})}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700">Enable push notifications</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={systemSettings.enableEmailAlerts}
                        onChange={(e) => setSystemSettings({...systemSettings, enableEmailAlerts: e.target.checked})}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700">Enable email alerts</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={systemSettings.autoBackup}
                        onChange={(e) => setSystemSettings({...systemSettings, autoBackup: e.target.checked})}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700">Enable automatic backups</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="primary"
                  onClick={() => handleSaveSettings('system')}
                  icon="Save"
                >
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleResetSettings('system')}
                  icon="RotateCcw"
                >
                  Reset to Default
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'grading' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
                  Grading Configuration
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Grading Scale"
                    type="select"
                    value={gradeSettings.gradingScale}
                    onChange={(e) => setGradeSettings({...gradeSettings, gradingScale: e.target.value})}
                    options={[
                      { value: 'standard', label: 'Standard (A-F)' },
                      { value: 'percentage', label: 'Percentage (0-100)' },
                      { value: 'points', label: 'Points-based' }
                    ]}
                  />
                  <FormField
                    label="Passing Grade"
                    type="number"
                    value={gradeSettings.passingGrade}
                    onChange={(e) => setGradeSettings({...gradeSettings, passingGrade: parseInt(e.target.value)})}
                    min="0"
                    max="100"
                  />
                  <FormField
                    label="Default Assignment Points"
                    type="number"
                    value={gradeSettings.defaultAssignmentPoints}
                    onChange={(e) => setGradeSettings({...gradeSettings, defaultAssignmentPoints: parseInt(e.target.value)})}
                    min="1"
                  />
                </div>

                <div className="mt-6 space-y-4">
                  <h4 className="text-md font-medium text-gray-900">Grading Options</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={gradeSettings.enableWeightedGrades}
                        onChange={(e) => setGradeSettings({...gradeSettings, enableWeightedGrades: e.target.checked})}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700">Enable weighted grades</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={gradeSettings.allowLateSubmissions}
                        onChange={(e) => setGradeSettings({...gradeSettings, allowLateSubmissions: e.target.checked})}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700">Allow late submissions</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="primary"
                  onClick={() => handleSaveSettings('grading')}
                  icon="Save"
                >
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleResetSettings('grading')}
                  icon="RotateCcw"
                >
                  Reset to Default
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
                  User Management
                </h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="Info" size={20} className="text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">
                        User Management Coming Soon
                      </p>
                      <p className="text-sm text-blue-700">
                        This feature will allow you to manage user accounts, roles, and permissions.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <ApperIcon name="Shield" size={20} className="text-primary" />
                      <h4 className="font-medium text-gray-900">Administrators</h4>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                    <p className="text-sm text-gray-600">Active admin accounts</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <ApperIcon name="GraduationCap" size={20} className="text-secondary" />
                      <h4 className="font-medium text-gray-900">Teachers</h4>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">15</p>
                    <p className="text-sm text-gray-600">Active teacher accounts</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <ApperIcon name="Users" size={20} className="text-success" />
                      <h4 className="font-medium text-gray-900">Students</h4>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">350</p>
                    <p className="text-sm text-gray-600">Active student accounts</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
                  Backup & Security
                </h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="CheckCircle" size={20} className="text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-green-900">
                        Last Backup: January 15, 2024 at 2:00 AM
                      </p>
                      <p className="text-sm text-green-700">
                        All data has been successfully backed up.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-4">Backup Settings</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Automatic Backups</span>
                        <span className="text-sm font-medium text-green-600">Enabled</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Backup Frequency</span>
                        <span className="text-sm font-medium text-gray-900">Daily</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Retention Period</span>
                        <span className="text-sm font-medium text-gray-900">30 days</span>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Button
                        variant="primary"
                        size="sm"
                        icon="Download"
                        onClick={() => toast.info('Manual backup started')}
                        className="w-full"
                      >
                        Create Backup Now
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        icon="Upload"
                        onClick={() => toast.info('Restore functionality - Coming soon!')}
                        className="w-full"
                      >
                        Restore from Backup
                      </Button>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-4">Security Settings</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Two-Factor Authentication</span>
                        <span className="text-sm font-medium text-green-600">Enabled</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Session Timeout</span>
                        <span className="text-sm font-medium text-gray-900">30 minutes</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Password Policy</span>
                        <span className="text-sm font-medium text-gray-900">Strong</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        icon="Shield"
                        onClick={() => toast.info('Security settings - Coming soon!')}
                        className="w-full"
                      >
                        Configure Security
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Settings;