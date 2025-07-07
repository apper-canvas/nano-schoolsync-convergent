import gradesData from '@/services/mockData/grades.json';

let grades = [...gradesData];

export const gradeService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...grades];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const grade = grades.find(g => g.Id === parseInt(id));
    return grade ? { ...grade } : null;
  },

  async create(gradeData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newGrade = {
      ...gradeData,
      Id: Math.max(...grades.map(g => g.Id)) + 1,
      gradedDate: new Date().toISOString()
    };
    grades.push(newGrade);
    return { ...newGrade };
  },

  async update(id, gradeData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = grades.findIndex(g => g.Id === parseInt(id));
    if (index !== -1) {
      grades[index] = { ...grades[index], ...gradeData };
      return { ...grades[index] };
    }
    return null;
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = grades.findIndex(g => g.Id === parseInt(id));
    if (index !== -1) {
      const deletedGrade = grades.splice(index, 1)[0];
      return { ...deletedGrade };
    }
    return null;
  },

  async getByStudent(studentId) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return grades.filter(g => g.studentId === studentId).map(g => ({ ...g }));
  },

  async getByAssignment(assignmentId) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return grades.filter(g => g.assignmentId === assignmentId).map(g => ({ ...g }));
  },

  async updateGrade(studentId, assignmentId, score) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Find existing grade
    const existingIndex = grades.findIndex(
      g => g.studentId === studentId && g.assignmentId === assignmentId
    );
    
    if (existingIndex !== -1) {
      // Update existing grade
      grades[existingIndex] = {
        ...grades[existingIndex],
        score,
        gradedDate: new Date().toISOString()
      };
      return { ...grades[existingIndex] };
    } else {
      // Create new grade
      const newGrade = {
        Id: Math.max(...grades.map(g => g.Id)) + 1,
        studentId,
        assignmentId,
        score,
        submittedDate: new Date().toISOString(),
        gradedDate: new Date().toISOString(),
        feedback: ''
      };
      grades.push(newGrade);
      return { ...newGrade };
    }
  },

  async getGradeStats(studentId = null, classId = null) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    let relevantGrades = [...grades];
    
    if (studentId) {
      relevantGrades = relevantGrades.filter(g => g.studentId === studentId);
    }
    
    if (relevantGrades.length === 0) {
      return { average: 0, total: 0, letterGrade: 'N/A' };
    }
    
    const total = relevantGrades.length;
    const sum = relevantGrades.reduce((acc, grade) => acc + grade.score, 0);
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
  }
};