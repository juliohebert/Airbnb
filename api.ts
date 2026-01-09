const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'production' 
    ? 'https://casa-verde-api.onrender.com' 
    : 'http://localhost:3001');

console.log('🔧 API_URL:', API_URL);
console.log('🔧 MODE:', import.meta.env.MODE);

export const api = {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('casa_verde_token');
    
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erro na requisição');
    }

    return data;
  },

  // Auth
  async login(email, password) {
    const data = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (data.token) {
      localStorage.setItem('casa_verde_token', data.token);
      localStorage.setItem('casa_verde_user', JSON.stringify(data.user));
    }
    
    return data;
  },

  async register(email, password, propertyName, ownerName) {
    const data = await this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, propertyName, ownerName }),
    });
    
    if (data.token) {
      localStorage.setItem('casa_verde_token', data.token);
      localStorage.setItem('casa_verde_user', JSON.stringify(data.user));
    }
    
    return data;
  },

  logout() {
    localStorage.removeItem('casa_verde_token');
    localStorage.removeItem('casa_verde_user');
  },

  // Guides
  async getGuides() {
    return this.request('/api/guides');
  },

  async getGuide(propertyId) {
    return this.request(`/api/guides/${propertyId}`);
  },

  async saveGuide(propertyId, guideData) {
    return this.request(`/api/guides/${propertyId}`, {
      method: 'PUT',
      body: JSON.stringify(guideData),
    });
  },

  async deleteGuide(propertyId) {
    return this.request(`/api/guides/${propertyId}`, {
      method: 'DELETE',
    });
  },

  // Admin
  async getUsers() {
    return this.request('/api/admin/users');
  },

  async updateUserStatus(userId, isActive) {
    return this.request(`/api/admin/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify({ isActive }),
    });
  },

  // Promover usuário atual a super admin
  async promoteToSuperAdmin() {
    return this.request('/api/admin/promote', {
      method: 'POST',
    });
  },
};
