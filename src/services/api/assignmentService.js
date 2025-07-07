import assignmentsData from '@/services/mockData/assignments.json';

let assignments = [...assignmentsData];

export const assignmentService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...assignments];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const assignment = assignments.find(a => a.Id === parseInt(id));
    return assignment ? { ...assignment } : null;
  },

  async create(assignmentData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newAssignment = {
      ...assignmentData,
      Id: Math.max(...assignments.map(a => a.Id)) + 1,
      createdAt: new Date().toISOString()
    };
    assignments.push(newAssignment);
    return { ...newAssignment };
  },

  async update(id, assignmentData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = assignments.findIndex(a => a.Id === parseInt(id));
    if (index !== -1) {
      assignments[index] = { ...assignments[index], ...assignmentData };
      return { ...assignments[index] };
    }
    return null;
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = assignments.findIndex(a => a.Id === parseInt(id));
    if (index !== -1) {
      const deletedAssignment = assignments.splice(index, 1)[0];
      return { ...deletedAssignment };
    }
    return null;
  },

  async getByClass(classId) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return assignments.filter(a => a.classId === classId).map(a => ({ ...a }));
  },

  async getBySubject(subject) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return assignments.filter(a => a.subject === subject).map(a => ({ ...a }));
  },

  async getUpcoming(days = 7) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const today = new Date();
    const futureDate = new Date(today.getTime() + (days * 24 * 60 * 60 * 1000));
    
    return assignments
      .filter(a => {
        const dueDate = new Date(a.dueDate);
        return dueDate >= today && dueDate <= futureDate;
      })
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .map(a => ({ ...a }));
  }
};