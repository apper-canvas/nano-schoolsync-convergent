export const attendanceService = {
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
          { field: { Name: "date" } },
          { field: { Name: "status" } },
          { field: { Name: "notes" } },
          {
            field: { name: "student_id" },
            referenceField: { field: { Name: "Name" } }
          },
          {
            field: { name: "class_id" },
            referenceField: { field: { Name: "Name" } }
          }
        ]
      };

      const response = await apperClient.fetchRecords('attendance', params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data?.map(record => ({
        Id: record.Id,
        name: record.Name || '',
        date: record.date || '',
        status: record.status || '',
        notes: record.notes || '',
        studentId: record.student_id?.Id || 0,
        classId: record.class_id?.Id || 0
      })) || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching attendance:", error?.response?.data?.message);
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
          { field: { Name: "date" } },
          { field: { Name: "status" } },
          { field: { Name: "notes" } },
          {
            field: { name: "student_id" },
            referenceField: { field: { Name: "Name" } }
          },
          {
            field: { name: "class_id" },
            referenceField: { field: { Name: "Name" } }
          }
        ]
      };

      const response = await apperClient.getRecordById('attendance', parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (!response.data) {
        return null;
      }

      const record = response.data;
      return {
        Id: record.Id,
        name: record.Name || '',
        date: record.date || '',
        status: record.status || '',
        notes: record.notes || '',
        studentId: record.student_id?.Id || 0,
        classId: record.class_id?.Id || 0
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching attendance with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async create(attendanceData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: attendanceData.name || '',
          date: attendanceData.date || '',
          status: attendanceData.status || 'present',
          notes: attendanceData.notes || '',
          student_id: parseInt(attendanceData.studentId) || 0,
          class_id: parseInt(attendanceData.classId) || 0
        }]
      };

      const response = await apperClient.createRecord('attendance', params);

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
        console.error("Error creating attendance:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async update(id, attendanceData) {
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
      if (attendanceData.name !== undefined) updateRecord.Name = attendanceData.name;
      if (attendanceData.date !== undefined) updateRecord.date = attendanceData.date;
      if (attendanceData.status !== undefined) updateRecord.status = attendanceData.status;
      if (attendanceData.notes !== undefined) updateRecord.notes = attendanceData.notes;
      if (attendanceData.studentId !== undefined) updateRecord.student_id = parseInt(attendanceData.studentId);
      if (attendanceData.classId !== undefined) updateRecord.class_id = parseInt(attendanceData.classId);

      const params = {
        records: [updateRecord]
      };

      const response = await apperClient.updateRecord('attendance', params);

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
        console.error("Error updating attendance:", error?.response?.data?.message);
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

      const response = await apperClient.deleteRecord('attendance', params);

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
        console.error("Error deleting attendance:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  },

  async markAttendance(studentId, date, status, classId = null) {
    // Check for existing record first
    const existingRecords = await this.getAll();
    const existing = existingRecords.find(record => 
      record.studentId === parseInt(studentId) && record.date === date
    );

    if (existing) {
      // Update existing record
      return await this.update(existing.Id, { status, classId });
    } else {
      // Create new record
      return await this.create({
        name: `Attendance for ${date}`,
        date,
        status,
        studentId: parseInt(studentId),
        classId: classId ? parseInt(classId) : 0,
        notes: ''
      });
    }
  },

  async getAttendanceStats(dateRange = null) {
    try {
      const allRecords = await this.getAll();
      
      const relevantRecords = dateRange
        ? allRecords.filter(a => a.date >= dateRange.start && a.date <= dateRange.end)
        : allRecords;
      
      const total = relevantRecords.length;
      const present = relevantRecords.filter(a => a.status === 'present').length;
      const absent = relevantRecords.filter(a => a.status === 'absent').length;
      const late = relevantRecords.filter(a => a.status === 'late').length;
      const excused = relevantRecords.filter(a => a.status === 'excused').length;
      
      return {
        total,
        present,
        absent,
        late,
        excused,
        attendanceRate: total > 0 ? Math.round((present / total) * 100) : 0
      };
    } catch (error) {
      console.error("Error calculating attendance stats:", error.message);
      return {
        total: 0,
        present: 0,
        absent: 0,
        late: 0,
        excused: 0,
        attendanceRate: 0
      };
    }
  }
};