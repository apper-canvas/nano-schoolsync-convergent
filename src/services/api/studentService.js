export const studentService = {
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
          { field: { Name: "email" } },
          { field: { Name: "grade" } },
          { field: { Name: "section" } },
          { field: { Name: "roll_number" } },
          { field: { Name: "phone" } },
          { field: { Name: "address" } },
          { field: { Name: "date_of_birth" } },
          { field: { Name: "parent_ids" } },
          { field: { Name: "profile_picture" } }
        ]
      };

      const response = await apperClient.fetchRecords('student', params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data?.map(student => ({
        Id: student.Id,
        name: student.Name || '',
        email: student.email || '',
        grade: student.grade || 0,
        section: student.section || '',
        rollNumber: student.roll_number || '',
        phone: student.phone || '',
        address: student.address || '',
        dateOfBirth: student.date_of_birth || '',
        parentIds: student.parent_ids ? student.parent_ids.split(',') : [],
        profilePicture: student.profile_picture || ''
      })) || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching students:", error?.response?.data?.message);
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
          { field: { Name: "email" } },
          { field: { Name: "grade" } },
          { field: { Name: "section" } },
          { field: { Name: "roll_number" } },
          { field: { Name: "phone" } },
          { field: { Name: "address" } },
          { field: { Name: "date_of_birth" } },
          { field: { Name: "parent_ids" } },
          { field: { Name: "profile_picture" } }
        ]
      };

      const response = await apperClient.getRecordById('student', parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (!response.data) {
        return null;
      }

      const student = response.data;
      return {
        Id: student.Id,
        name: student.Name || '',
        email: student.email || '',
        grade: student.grade || 0,
        section: student.section || '',
        rollNumber: student.roll_number || '',
        phone: student.phone || '',
        address: student.address || '',
        dateOfBirth: student.date_of_birth || '',
        parentIds: student.parent_ids ? student.parent_ids.split(',') : [],
        profilePicture: student.profile_picture || ''
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching student with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async create(studentData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: studentData.name || '',
          email: studentData.email || '',
          grade: parseInt(studentData.grade) || 0,
          section: studentData.section || '',
          roll_number: studentData.rollNumber || '',
          phone: studentData.phone || '',
          address: studentData.address || '',
          date_of_birth: studentData.dateOfBirth || '',
          parent_ids: Array.isArray(studentData.parentIds) ? studentData.parentIds.join(',') : '',
          profile_picture: studentData.profilePicture || ''
        }]
      };

      const response = await apperClient.createRecord('student', params);

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
        console.error("Error creating student:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async update(id, studentData) {
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
      if (studentData.name !== undefined) updateRecord.Name = studentData.name;
      if (studentData.email !== undefined) updateRecord.email = studentData.email;
      if (studentData.grade !== undefined) updateRecord.grade = parseInt(studentData.grade);
      if (studentData.section !== undefined) updateRecord.section = studentData.section;
      if (studentData.rollNumber !== undefined) updateRecord.roll_number = studentData.rollNumber;
      if (studentData.phone !== undefined) updateRecord.phone = studentData.phone;
      if (studentData.address !== undefined) updateRecord.address = studentData.address;
      if (studentData.dateOfBirth !== undefined) updateRecord.date_of_birth = studentData.dateOfBirth;
      if (studentData.parentIds !== undefined) {
        updateRecord.parent_ids = Array.isArray(studentData.parentIds) ? studentData.parentIds.join(',') : studentData.parentIds;
      }
      if (studentData.profilePicture !== undefined) updateRecord.profile_picture = studentData.profilePicture;

      const params = {
        records: [updateRecord]
      };

      const response = await apperClient.updateRecord('student', params);

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
        console.error("Error updating student:", error?.response?.data?.message);
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

      const response = await apperClient.deleteRecord('student', params);

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
        console.error("Error deleting student:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  }
};