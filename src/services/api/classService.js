export const classService = {
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
          { field: { Name: "subject" } },
          { field: { Name: "teacher_id" } },
          { field: { Name: "teacher" } },
          { field: { Name: "grade" } },
          { field: { Name: "section" } },
          { field: { Name: "student_ids" } },
          { field: { Name: "schedule" } },
          { field: { Name: "room" } },
          { field: { Name: "description" } }
        ]
      };

      const response = await apperClient.fetchRecords('class', params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data?.map(classItem => ({
        Id: classItem.Id,
        name: classItem.Name || '',
        subject: classItem.subject || '',
        teacherId: classItem.teacher_id || '',
        teacher: classItem.teacher || '',
        grade: classItem.grade || 0,
        section: classItem.section || '',
        studentIds: classItem.student_ids ? classItem.student_ids.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id)) : [],
        schedule: classItem.schedule || '',
        room: classItem.room || '',
        description: classItem.description || ''
      })) || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching classes:", error?.response?.data?.message);
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
          { field: { Name: "subject" } },
          { field: { Name: "teacher_id" } },
          { field: { Name: "teacher" } },
          { field: { Name: "grade" } },
          { field: { Name: "section" } },
          { field: { Name: "student_ids" } },
          { field: { Name: "schedule" } },
          { field: { Name: "room" } },
          { field: { Name: "description" } }
        ]
      };

      const response = await apperClient.getRecordById('class', parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (!response.data) {
        return null;
      }

      const classItem = response.data;
      return {
        Id: classItem.Id,
        name: classItem.Name || '',
        subject: classItem.subject || '',
        teacherId: classItem.teacher_id || '',
        teacher: classItem.teacher || '',
        grade: classItem.grade || 0,
        section: classItem.section || '',
        studentIds: classItem.student_ids ? classItem.student_ids.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id)) : [],
        schedule: classItem.schedule || '',
        room: classItem.room || '',
        description: classItem.description || ''
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching class with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async create(classData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: classData.name || '',
          subject: classData.subject || '',
          teacher_id: classData.teacherId || '',
          teacher: classData.teacher || '',
          grade: parseInt(classData.grade) || 0,
          section: classData.section || '',
          student_ids: Array.isArray(classData.studentIds) ? classData.studentIds.join(',') : '',
          schedule: classData.schedule || '',
          room: classData.room || '',
          description: classData.description || ''
        }]
      };

      const response = await apperClient.createRecord('class', params);

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
        console.error("Error creating class:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async update(id, classData) {
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
      if (classData.name !== undefined) updateRecord.Name = classData.name;
      if (classData.subject !== undefined) updateRecord.subject = classData.subject;
      if (classData.teacherId !== undefined) updateRecord.teacher_id = classData.teacherId;
      if (classData.teacher !== undefined) updateRecord.teacher = classData.teacher;
      if (classData.grade !== undefined) updateRecord.grade = parseInt(classData.grade);
      if (classData.section !== undefined) updateRecord.section = classData.section;
      if (classData.studentIds !== undefined) {
        updateRecord.student_ids = Array.isArray(classData.studentIds) ? classData.studentIds.join(',') : classData.studentIds;
      }
      if (classData.schedule !== undefined) updateRecord.schedule = classData.schedule;
      if (classData.room !== undefined) updateRecord.room = classData.room;
      if (classData.description !== undefined) updateRecord.description = classData.description;

      const params = {
        records: [updateRecord]
      };

      const response = await apperClient.updateRecord('class', params);

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
        console.error("Error updating class:", error?.response?.data?.message);
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

      const response = await apperClient.deleteRecord('class', params);

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
        console.error("Error deleting class:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  }
};