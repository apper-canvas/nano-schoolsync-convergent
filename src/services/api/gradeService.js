export const gradeService = {
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
          { field: { Name: "score" } },
          { field: { Name: "submitted_date" } },
          { field: { Name: "feedback" } },
          { field: { Name: "graded_date" } },
          {
            field: { name: "student_id" },
            referenceField: { field: { Name: "Name" } }
          },
          {
            field: { name: "assignment_id" },
            referenceField: { field: { Name: "Name" } }
          }
        ]
      };

      const response = await apperClient.fetchRecords('grade', params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data?.map(grade => ({
        Id: grade.Id,
        name: grade.Name || '',
        score: grade.score || 0,
        submittedDate: grade.submitted_date || '',
        feedback: grade.feedback || '',
        gradedDate: grade.graded_date || '',
        studentId: grade.student_id?.Id || 0,
        assignmentId: grade.assignment_id?.Id || 0
      })) || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching grades:", error?.response?.data?.message);
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
          { field: { Name: "score" } },
          { field: { Name: "submitted_date" } },
          { field: { Name: "feedback" } },
          { field: { Name: "graded_date" } },
          {
            field: { name: "student_id" },
            referenceField: { field: { Name: "Name" } }
          },
          {
            field: { name: "assignment_id" },
            referenceField: { field: { Name: "Name" } }
          }
        ]
      };

      const response = await apperClient.getRecordById('grade', parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (!response.data) {
        return null;
      }

      const grade = response.data;
      return {
        Id: grade.Id,
        name: grade.Name || '',
        score: grade.score || 0,
        submittedDate: grade.submitted_date || '',
        feedback: grade.feedback || '',
        gradedDate: grade.graded_date || '',
        studentId: grade.student_id?.Id || 0,
        assignmentId: grade.assignment_id?.Id || 0
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching grade with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async create(gradeData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: gradeData.name || `Grade for ${gradeData.studentId}`,
          score: parseInt(gradeData.score) || 0,
          submitted_date: gradeData.submittedDate || '',
          feedback: gradeData.feedback || '',
          graded_date: new Date().toISOString().split('T')[0],
          student_id: parseInt(gradeData.studentId) || 0,
          assignment_id: parseInt(gradeData.assignmentId) || 0
        }]
      };

      const response = await apperClient.createRecord('grade', params);

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
        console.error("Error creating grade:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async update(id, gradeData) {
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
      if (gradeData.name !== undefined) updateRecord.Name = gradeData.name;
      if (gradeData.score !== undefined) updateRecord.score = parseInt(gradeData.score);
      if (gradeData.submittedDate !== undefined) updateRecord.submitted_date = gradeData.submittedDate;
      if (gradeData.feedback !== undefined) updateRecord.feedback = gradeData.feedback;
      if (gradeData.gradedDate !== undefined) updateRecord.graded_date = gradeData.gradedDate;
      if (gradeData.studentId !== undefined) updateRecord.student_id = parseInt(gradeData.studentId);
      if (gradeData.assignmentId !== undefined) updateRecord.assignment_id = parseInt(gradeData.assignmentId);

      const params = {
        records: [updateRecord]
      };

      const response = await apperClient.updateRecord('grade', params);

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
        console.error("Error updating grade:", error?.response?.data?.message);
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

      const response = await apperClient.deleteRecord('grade', params);

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
        console.error("Error deleting grade:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  },

  async updateGrade(studentId, assignmentId, score) {
    // Check for existing grade first
    const existingGrades = await this.getAll();
    const existing = existingGrades.find(grade => 
      grade.studentId === parseInt(studentId) && grade.assignmentId === parseInt(assignmentId)
    );

    if (existing) {
      // Update existing grade
      return await this.update(existing.Id, { 
        score: parseInt(score),
        gradedDate: new Date().toISOString().split('T')[0]
      });
    } else {
      // Create new grade
      return await this.create({
        studentId: parseInt(studentId),
        assignmentId: parseInt(assignmentId),
        score: parseInt(score),
        submittedDate: new Date().toISOString().split('T')[0],
        gradedDate: new Date().toISOString().split('T')[0],
        feedback: ''
      });
    }
  },

  async getGradeStats(studentId = null, classId = null) {
    try {
      const allGrades = await this.getAll();
      
      let relevantGrades = [...allGrades];
      
      if (studentId) {
        relevantGrades = relevantGrades.filter(g => g.studentId === parseInt(studentId));
      }
      
      if (relevantGrades.length === 0) {
        return { average: 0, total: 0, letterGrade: 'N/A' };
      }
      
      const total = relevantGrades.length;
      const sum = relevantGrades.reduce((acc, grade) => acc + (grade.score || 0), 0);
      const average = sum / total;
      
      let letterGrade = 'F';
      if (average >= 90) letterGrade = 'A';
      else if (average >= 80) letterGrade = 'B';
      else if (average >= 70) letterGrade = 'C';
      else if (average >= 60) letterGrade = 'D';
      
      return {
        average: Math.round(average * 100) / 100,
        total,
        letterGrade,
        distribution: {
          A: relevantGrades.filter(g => g.score >= 90).length,
          B: relevantGrades.filter(g => g.score >= 80 && g.score < 90).length,
          C: relevantGrades.filter(g => g.score >= 70 && g.score < 80).length,
          D: relevantGrades.filter(g => g.score >= 60 && g.score < 70).length,
          F: relevantGrades.filter(g => g.score < 60).length
        }
      };
    } catch (error) {
      console.error("Error calculating grade stats:", error.message);
      return { average: 0, total: 0, letterGrade: 'N/A' };
    }
  }
};