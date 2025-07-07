import classesData from '@/services/mockData/classes.json';

let classes = [...classesData];

export const classService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...classes];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const classItem = classes.find(c => c.Id === parseInt(id));
    return classItem ? { ...classItem } : null;
  },

  async create(classData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newClass = {
      ...classData,
      Id: Math.max(...classes.map(c => c.Id)) + 1
    };
    classes.push(newClass);
    return { ...newClass };
  },

  async update(id, classData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = classes.findIndex(c => c.Id === parseInt(id));
    if (index !== -1) {
      classes[index] = { ...classes[index], ...classData };
      return { ...classes[index] };
    }
    return null;
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = classes.findIndex(c => c.Id === parseInt(id));
    if (index !== -1) {
      const deletedClass = classes.splice(index, 1)[0];
      return { ...deletedClass };
    }
    return null;
  },

  async getByTeacher(teacherId) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return classes.filter(c => c.teacherId === teacherId).map(c => ({ ...c }));
  },

  async getByStudent(studentId) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return classes.filter(c => c.studentIds?.includes(studentId)).map(c => ({ ...c }));
  }
};