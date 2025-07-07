import announcementsData from '@/services/mockData/announcements.json';

let announcements = [...announcementsData];

export const announcementService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...announcements].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const announcement = announcements.find(a => a.Id === parseInt(id));
    return announcement ? { ...announcement } : null;
  },

  async create(announcementData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newAnnouncement = {
      ...announcementData,
      Id: Math.max(...announcements.map(a => a.Id)) + 1,
      createdAt: new Date().toISOString(),
      isActive: true
    };
    announcements.push(newAnnouncement);
    return { ...newAnnouncement };
  },

  async update(id, announcementData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = announcements.findIndex(a => a.Id === parseInt(id));
    if (index !== -1) {
      announcements[index] = { ...announcements[index], ...announcementData };
      return { ...announcements[index] };
    }
    return null;
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = announcements.findIndex(a => a.Id === parseInt(id));
    if (index !== -1) {
      const deletedAnnouncement = announcements.splice(index, 1)[0];
      return { ...deletedAnnouncement };
    }
    return null;
  },

  async getByAudience(audience) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return announcements
      .filter(a => a.targetAudience === audience || a.targetAudience === 'all')
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map(a => ({ ...a }));
  },

  async getActive() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return announcements
      .filter(a => a.isActive)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map(a => ({ ...a }));
  },

  async getRecent(days = 7) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const cutoffDate = new Date(Date.now() - (days * 24 * 60 * 60 * 1000));
    
    return announcements
      .filter(a => new Date(a.createdAt) >= cutoffDate)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map(a => ({ ...a }));
  },

  async markAsRead(id, userId) {
    await new Promise(resolve => setTimeout(resolve, 200));
    // This would typically track read status per user
    // For now, just return success
    return { success: true };
  }
};