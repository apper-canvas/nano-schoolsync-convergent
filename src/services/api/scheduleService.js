export const scheduleService = {
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
          { field: { Name: "day" } },
          { field: { Name: "time" } },
          { field: { Name: "subject" } },
          { field: { Name: "teacher" } },
          { field: { Name: "room" } },
          {
            field: { name: "class_id" },
            referenceField: { field: { Name: "Name" } }
          }
        ]
      };

      const response = await apperClient.fetchRecords('schedule', params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data?.map(item => ({
        Id: item.Id,
        name: item.Name || '',
        day: item.day || '',
        time: item.time || '',
        subject: item.subject || '',
        teacher: item.teacher || '',
        room: item.room || '',
        classId: item.class_id?.Id || 0
      })) || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching schedule:", error?.response?.data?.message);
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
          { field: { Name: "day" } },
          { field: { Name: "time" } },
          { field: { Name: "subject" } },
          { field: { Name: "teacher" } },
          { field: { Name: "room" } },
          {
            field: { name: "class_id" },
            referenceField: { field: { Name: "Name" } }
          }
        ]
      };

      const response = await apperClient.getRecordById('schedule', parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (!response.data) {
        return null;
      }

      const item = response.data;
      return {
        Id: item.Id,
        name: item.Name || '',
        day: item.day || '',
        time: item.time || '',
        subject: item.subject || '',
        teacher: item.teacher || '',
        room: item.room || '',
        classId: item.class_id?.Id || 0
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching schedule with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async create(scheduleData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: scheduleData.name || `${scheduleData.subject} - ${scheduleData.day}`,
          day: scheduleData.day || '',
          time: scheduleData.time || '',
          subject: scheduleData.subject || '',
          teacher: scheduleData.teacher || '',
          room: scheduleData.room || '',
          class_id: parseInt(scheduleData.classId) || 0
        }]
      };

      const response = await apperClient.createRecord('schedule', params);

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
        console.error("Error creating schedule:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async update(id, scheduleData) {
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
      if (scheduleData.name !== undefined) updateRecord.Name = scheduleData.name;
      if (scheduleData.day !== undefined) updateRecord.day = scheduleData.day;
      if (scheduleData.time !== undefined) updateRecord.time = scheduleData.time;
      if (scheduleData.subject !== undefined) updateRecord.subject = scheduleData.subject;
      if (scheduleData.teacher !== undefined) updateRecord.teacher = scheduleData.teacher;
      if (scheduleData.room !== undefined) updateRecord.room = scheduleData.room;
      if (scheduleData.classId !== undefined) updateRecord.class_id = parseInt(scheduleData.classId);

      const params = {
        records: [updateRecord]
      };

      const response = await apperClient.updateRecord('schedule', params);

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
        console.error("Error updating schedule:", error?.response?.data?.message);
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

      const response = await apperClient.deleteRecord('schedule', params);

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
        console.error("Error deleting schedule:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  },

  async getTodaySchedule() {
    try {
      const allSchedule = await this.getAll();
      const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      
      return allSchedule
        .filter(s => s.day === today)
        .sort((a, b) => a.time.localeCompare(b.time));
    } catch (error) {
      console.error("Error getting today's schedule:", error.message);
      return [];
    }
  },

  async getWeeklySchedule() {
    try {
      const allSchedule = await this.getAll();
      const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      const weeklySchedule = {};
      
      weekDays.forEach(day => {
        weeklySchedule[day] = allSchedule
          .filter(s => s.day === day)
          .sort((a, b) => a.time.localeCompare(b.time));
      });
      
      return weeklySchedule;
    } catch (error) {
      console.error("Error getting weekly schedule:", error.message);
      return {};
    }
  }
};