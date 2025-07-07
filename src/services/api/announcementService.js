export const announcementService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "content" } },
          { field: { Name: "author_id" } },
          { field: { Name: "target_audience" } },
          { field: { Name: "created_at" } },
          { field: { Name: "priority" } },
          { field: { Name: "is_active" } }
        ],
        orderBy: [
          {
            fieldName: "created_at",
            sorttype: "DESC"
          }
        ]
      };

      const response = await apperClient.fetchRecords('announcement', params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data?.map(announcement => ({
        Id: announcement.Id,
        name: announcement.Name || '',
        title: announcement.title || '',
        content: announcement.content || '',
        authorId: announcement.author_id || '',
        targetAudience: announcement.target_audience || 'all',
        createdAt: announcement.created_at || '',
        priority: announcement.priority || 'medium',
        isActive: announcement.is_active || false
      })) || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching announcements:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "content" } },
          { field: { Name: "author_id" } },
          { field: { Name: "target_audience" } },
          { field: { Name: "created_at" } },
          { field: { Name: "priority" } },
          { field: { Name: "is_active" } }
        ]
      };

      const response = await apperClient.getRecordById('announcement', parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (!response.data) {
        return null;
      }

      const announcement = response.data;
      return {
        Id: announcement.Id,
        name: announcement.Name || '',
        title: announcement.title || '',
        content: announcement.content || '',
        authorId: announcement.author_id || '',
        targetAudience: announcement.target_audience || 'all',
        createdAt: announcement.created_at || '',
        priority: announcement.priority || 'medium',
        isActive: announcement.is_active || false
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching announcement with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async create(announcementData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: announcementData.name || announcementData.title || '',
          title: announcementData.title || '',
          content: announcementData.content || '',
          author_id: announcementData.authorId || '',
          target_audience: announcementData.targetAudience || 'all',
          created_at: new Date().toISOString(),
          priority: announcementData.priority || 'medium',
          is_active: announcementData.isActive !== undefined ? announcementData.isActive : true
        }]
      };

      const response = await apperClient.createRecord('announcement', params);

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);

        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
        }

        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating announcement:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async update(id, announcementData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const updateRecord = {
        Id: parseInt(id)
      };

      // Only include updateable fields that were provided
      if (announcementData.name !== undefined) updateRecord.Name = announcementData.name;
      if (announcementData.title !== undefined) updateRecord.title = announcementData.title;
      if (announcementData.content !== undefined) updateRecord.content = announcementData.content;
      if (announcementData.authorId !== undefined) updateRecord.author_id = announcementData.authorId;
      if (announcementData.targetAudience !== undefined) updateRecord.target_audience = announcementData.targetAudience;
      if (announcementData.createdAt !== undefined) updateRecord.created_at = announcementData.createdAt;
      if (announcementData.priority !== undefined) updateRecord.priority = announcementData.priority;
      if (announcementData.isActive !== undefined) updateRecord.is_active = announcementData.isActive;

      const params = {
        records: [updateRecord]
      };

      const response = await apperClient.updateRecord('announcement', params);

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);

        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
        }

        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating announcement:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord('announcement', params);

      if (!response.success) {
        console.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);

        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
        }

        return successfulDeletions.length > 0;
      }

      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting announcement:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  },

  async getRecent(days = 7) {
    try {
      const allAnnouncements = await this.getAll();
      const cutoffDate = new Date(Date.now() - (days * 24 * 60 * 60 * 1000));
      
      return allAnnouncements
        .filter(a => new Date(a.createdAt) >= cutoffDate)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
      console.error("Error getting recent announcements:", error.message);
      return [];
    }
  }
};