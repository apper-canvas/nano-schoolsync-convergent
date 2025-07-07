import React, { useState } from 'react';
import { useAsync } from '@/hooks/useAsync';
import { announcementService } from '@/services/api/announcementService';
import { toast } from 'react-toastify';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import SearchBar from '@/components/molecules/SearchBar';
import AnnouncementList from '@/components/organisms/AnnouncementList';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';

const Announcements = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('');
  
  const { data: announcements, loading, error, retry } = useAsync(
    announcementService.getAll
  );

  const handleEdit = (announcement) => {
    toast.info(`Edit functionality for "${announcement.title}" - Coming soon!`);
  };

  const handleDelete = async (announcement) => {
    if (window.confirm(`Are you sure you want to delete "${announcement.title}"?`)) {
      try {
        await announcementService.delete(announcement.Id);
        toast.success('Announcement deleted successfully');
        retry();
      } catch (error) {
        toast.error('Failed to delete announcement');
      }
    }
  };

  const handleNewAnnouncement = () => {
    toast.info('Create new announcement functionality - Coming soon!');
  };

  const filteredAnnouncements = announcements?.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAudience = selectedAudience === '' || announcement.targetAudience === selectedAudience;
    return matchesSearch && matchesAudience;
  }) || [];

  const audiences = [...new Set(announcements?.map(a => a.targetAudience) || [])].sort();

  if (loading) {
    return <Loading type="cards" />;
  }

  if (error) {
    return (
      <Error
        title="Failed to load announcements"
        message="There was an error loading the announcements. Please try again."
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
            Announcements
          </h1>
          <p className="text-gray-600 mt-1">
            Share important updates and information
          </p>
        </div>
        <Button
          variant="primary"
          icon="Plus"
          onClick={handleNewAnnouncement}
          className="shadow-lg hover:shadow-xl"
        >
          New Announcement
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SearchBar
              placeholder="Search announcements..."
              onSearch={setSearchTerm}
              className="md:col-span-2"
            />
            <div>
              <select
                value={selectedAudience}
                onChange={(e) => setSelectedAudience(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="">All Audiences</option>
                {audiences.map(audience => (
                  <option key={audience} value={audience}>
                    {audience.charAt(0).toUpperCase() + audience.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Announcements Stats */}
      <Card>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {announcements?.length || 0}
              </div>
              <p className="text-sm text-gray-600">Total Announcements</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {announcements?.filter(a => a.isActive).length || 0}
              </div>
              <p className="text-sm text-gray-600">Active</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {announcements?.filter(a => a.targetAudience === 'all').length || 0}
              </div>
              <p className="text-sm text-gray-600">School-wide</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {announcements?.filter(a => a.priority === 'high').length || 0}
              </div>
              <p className="text-sm text-gray-600">High Priority</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Announcements List */}
      <Card>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-display font-semibold text-gray-900">
                All Announcements
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {filteredAnnouncements.length} of {announcements?.length || 0} announcements
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" icon="Filter">
                Filter
              </Button>
              <Button variant="ghost" size="sm" icon="Archive">
                Archive
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {filteredAnnouncements.length > 0 ? (
            <AnnouncementList
              announcements={filteredAnnouncements}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <Empty
              title="No announcements found"
              message={searchTerm || selectedAudience ? 
                "No announcements match your current filters. Try adjusting your search criteria." :
                "No announcements have been created yet. Share your first announcement with the school community."
              }
              icon="Megaphone"
              actionLabel={!searchTerm && !selectedAudience ? "Create Announcement" : undefined}
              onAction={!searchTerm && !selectedAudience ? handleNewAnnouncement : undefined}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default Announcements;