import attendanceData from '@/services/mockData/attendance.json';

let attendance = [...attendanceData];

export const attendanceService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...attendance];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const record = attendance.find(a => a.Id === parseInt(id));
    return record ? { ...record } : null;
  },

  async create(attendanceData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newRecord = {
      ...attendanceData,
      Id: Math.max(...attendance.map(a => a.Id)) + 1
    };
    attendance.push(newRecord);
    return { ...newRecord };
  },

  async update(id, attendanceData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = attendance.findIndex(a => a.Id === parseInt(id));
    if (index !== -1) {
      attendance[index] = { ...attendance[index], ...attendanceData };
      return { ...attendance[index] };
    }
    return null;
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = attendance.findIndex(a => a.Id === parseInt(id));
    if (index !== -1) {
      const deletedRecord = attendance.splice(index, 1)[0];
      return { ...deletedRecord };
    }
    return null;
  },

  async getByDate(date) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return attendance.filter(a => a.date === date).map(a => ({ ...a }));
  },

  async getByStudent(studentId) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return attendance.filter(a => a.studentId === studentId).map(a => ({ ...a }));
  },

  async markAttendance(studentId, date, status, classId = null) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Find existing record
    const existingIndex = attendance.findIndex(
      a => a.studentId === studentId && a.date === date
    );
    
    if (existingIndex !== -1) {
      // Update existing record
      attendance[existingIndex] = {
        ...attendance[existingIndex],
        status,
        classId: classId || attendance[existingIndex].classId
      };
      return { ...attendance[existingIndex] };
    } else {
      // Create new record
      const newRecord = {
        Id: Math.max(...attendance.map(a => a.Id)) + 1,
        studentId,
        date,
        status,
        classId: classId || 1,
        notes: ''
      };
      attendance.push(newRecord);
      return { ...newRecord };
    }
  },

  async getAttendanceStats(dateRange = null) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const relevantRecords = dateRange
      ? attendance.filter(a => a.date >= dateRange.start && a.date <= dateRange.end)
      : attendance;
    
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
  }
};