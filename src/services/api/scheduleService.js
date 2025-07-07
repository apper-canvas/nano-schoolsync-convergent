import scheduleData from '@/services/mockData/schedule.json';

let schedule = [...scheduleData];

export const scheduleService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...schedule];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const item = schedule.find(s => s.Id === parseInt(id));
    return item ? { ...item } : null;
  },

  async create(scheduleData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newItem = {
      ...scheduleData,
      Id: Math.max(...schedule.map(s => s.Id)) + 1
    };
    schedule.push(newItem);
    return { ...newItem };
  },

  async update(id, scheduleData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = schedule.findIndex(s => s.Id === parseInt(id));
    if (index !== -1) {
      schedule[index] = { ...schedule[index], ...scheduleData };
      return { ...schedule[index] };
    }
    return null;
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = schedule.findIndex(s => s.Id === parseInt(id));
    if (index !== -1) {
      const deletedItem = schedule.splice(index, 1)[0];
      return { ...deletedItem };
    }
    return null;
  },

  async getByDay(day) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return schedule
      .filter(s => s.day === day)
      .sort((a, b) => a.time.localeCompare(b.time))
      .map(s => ({ ...s }));
  },

  async getByClass(classId) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return schedule.filter(s => s.classId === classId).map(s => ({ ...s }));
  },

  async getByTeacher(teacherId) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return schedule.filter(s => s.teacherId === teacherId).map(s => ({ ...s }));
  },

  async getWeeklySchedule() {
    await new Promise(resolve => setTimeout(resolve, 400));
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const weeklySchedule = {};
    
    weekDays.forEach(day => {
      weeklySchedule[day] = schedule
        .filter(s => s.day === day)
        .sort((a, b) => a.time.localeCompare(b.time))
        .map(s => ({ ...s }));
    });
    
    return weeklySchedule;
  },

  async getTodaySchedule() {
    await new Promise(resolve => setTimeout(resolve, 300));
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    
    return schedule
      .filter(s => s.day === today)
      .sort((a, b) => a.time.localeCompare(b.time))
      .map(s => ({ ...s }));
  },

  async getUpcomingClasses(hours = 2) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
    const currentTime = now.toTimeString().slice(0, 5);
    
    const todayClasses = schedule
      .filter(s => s.day === currentDay && s.time >= currentTime)
      .sort((a, b) => a.time.localeCompare(b.time))
      .slice(0, 3)
      .map(s => ({ ...s }));
    
    return todayClasses;
  }
};