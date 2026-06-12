const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function getToken() {
  return localStorage.getItem('lumenui_token');
}

export function setToken(token) {
  localStorage.setItem('lumenui_token', token);
}

export function clearToken() {
  localStorage.removeItem('lumenui_token');
}

export function isLoggedIn() {
  return !!getToken();
}

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  return data;
}

/* -------------------- AUTH -------------------- */
export const login = (username, password) =>
  request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) });

export const verifyToken = () => request('/auth/me');

export const changeCredentials = (currentPassword, newUsername, newPassword) =>
  request('/auth/change-credentials', {
    method: 'POST',
    body: JSON.stringify({ currentPassword, newUsername, newPassword }),
  });

/* ------------------ CATEGORIES ------------------ */
export const getCategories = () => request('/categories');
export const addCategory = (name) =>
  request('/categories', { method: 'POST', body: JSON.stringify({ name }) });
export const deleteCategory = (id) =>
  request(`/categories/${id}`, { method: 'DELETE' });

/* ------------------ TEMPLATES ------------------- */
export const getTemplates = () => request('/templates');
export const getTemplate = (id) => request(`/templates/${id}`);
export const getAdminTemplates = () => request('/admin/templates');
export const addTemplate = (data) =>
  request('/admin/templates', { method: 'POST', body: JSON.stringify(data) });
export const updateTemplate = (id, data) =>
  request(`/admin/templates/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteTemplate = (id) =>
  request(`/admin/templates/${id}`, { method: 'DELETE' });

/* ------------------- MESSAGES ------------------- */
export const sendMessage = (data) =>
  request('/messages', { method: 'POST', body: JSON.stringify(data) });
export const getAdminMessages = () => request('/admin/messages');
export const deleteMessage = (id) =>
  request(`/admin/messages/${id}`, { method: 'DELETE' });

/* -------------------- PAYMENT -------------------- */
export const createCheckoutSession = (templateId) =>
  request('/payment/create-checkout-session', {
    method: 'POST',
    body: JSON.stringify({ templateId }),
  });
export const getAdminOrders = () => request('/admin/orders');
