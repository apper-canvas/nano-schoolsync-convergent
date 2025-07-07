export const assignmentService = {
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
          { field: { Name: "subject" } },
          { field: { Name: "due_date" } },
          { field: { Name: "total_points" } },
          { field: { Name: "description" } },
          { field: { Name: "type" } },
          { field: { Name: "created_at" } },
          {
            field: { name: "class_id" },
            referenceField: { field: { Name: "Name" } }
          }
        ]
      };

      const response = await apperClient.fetchRecords('assignment', params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data?.map(assignment => ({
        Id: assignment.Id,
        name: assignment.Name || '',
        title: assignment.title || '',
        subject: assignment.subject || '',
        dueDate: assignment.due_date || '',
        totalPoints: assignment.total_points || 0,
        description: assignment.description || '',
        type: assignment.type || '',
        createdAt: assignment.created_at || '',
        classId: assignment.class_id?.Id || 0
      })) || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching assignments:", error?.response?.data?.message);
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
          { field: { Name: "subject" } },
          { field: { Name: "due_date" } },
          { field: { Name: "total_points" } },
          { field: { Name: "description" } },
          { field: { Name: "type" } },
          { field: { Name: "created_at" } },
          {
            field: { name: "class_id" },
            referenceField: { field: { Name: "Name" } }
          }
        ]
      };

      const response = await apperClient.getRecordById('assignment', parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (!response.data) {
        return null;
      }

      const assignment = response.data;
      return {
        Id: assignment.Id,
        name: assignment.Name || '',
        title: assignment.title || '',
        subject: assignment.subject || '',
        dueDate: assignment.due_date || '',
        totalPoints: assignment.total_points || 0,
        description: assignment.description || '',
        type: assignment.type || '',
        createdAt: assignment.created_at || '',
        classId: assignment.class_id?.Id || 0
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching assignment with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async create(assignmentData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: assignmentData.name || assignmentData.title || '',
          title: assignmentData.title || '',
          subject: assignmentData.subject || '',
          due_date: assignmentData.dueDate || '',
          total_points: parseInt(assignmentData.totalPoints) || 0,
          description: assignmentData.description || '',
          type: assignmentData.type || '',
          created_at: new Date().toISOString(),
          class_id: parseInt(assignmentData.classId) || 0
        }]
      };

      const response = await apperClient.createRecord('assignment', params);

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
        console.error("Error creating assignment:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async update(id, assignmentData) {
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
      if (assignmentData.name !== undefined) updateRecord.Name = assignmentData.name;
      if (assignmentData.title !== undefined) updateRecord.title = assignmentData.title;
      if (assignmentData.subject !== undefined) updateRecord.subject = assignmentData.subject;
      if (assignmentData.dueDate !== undefined) updateRecord.due_date = assignmentData.dueDate;
      if (assignmentData.totalPoints !== undefined) updateRecord.total_points = parseInt(assignmentData.totalPoints);
      if (assignmentData.description !== undefined) updateRecord.description = assignmentData.description;
      if (assignmentData.type !== undefined) updateRecord.type = assignmentData.type;
      if (assignmentData.createdAt !== undefined) updateRecord.created_at = assignmentData.createdAt;
      if (assignmentData.classId !== undefined) updateRecord.class_id = parseInt(assignmentData.classId);

      const params = {
        records: [updateRecord]
      };

      const response = await apperClient.updateRecord('assignment', params);

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
        console.error("Error updating assignment:", error?.response?.data?.message);
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

      const response = await apperClient.deleteRecord('assignment', params);

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
        console.error("Error deleting assignment:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  }
};