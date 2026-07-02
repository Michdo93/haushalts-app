// ============================================================
//  API Client – Haushalts-App
//  Setzt BACKEND_URL auf deine Render.com URL!
// ============================================================
const BACKEND_URL = 'https://haushalts-backend.onrender.com'; // <-- anpassen

const api = {
  _token: () => localStorage.getItem('hh_token'),
  _headers(json = true) {
    const h = {};
    if (json) h['Content-Type'] = 'application/json';
    const t = this._token();
    if (t) h['Authorization'] = 'Bearer ' + t;
    return h;
  },

  async _fetch(path, opts = {}) {
    const res = await fetch(BACKEND_URL + path, opts);
    if (res.status === 204) return null;
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.detail || `HTTP ${res.status}`);
    return data;
  },

  // Auth
  async register(username, email, password) {
    const d = await this._fetch('/auth/register', {
      method: 'POST',
      headers: this._headers(),
      body: JSON.stringify({ username, email, password }),
    });
    localStorage.setItem('hh_token', d.access_token);
    localStorage.setItem('hh_user', d.username);
    return d;
  },

  async login(username, password) {
    const form = new URLSearchParams({ username, password });
    const d = await this._fetch('/auth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form,
    });
    localStorage.setItem('hh_token', d.access_token);
    const me = await this.me();
    localStorage.setItem('hh_user', me.username);
    return me;
  },

  logout() {
    localStorage.removeItem('hh_token');
    localStorage.removeItem('hh_user');
  },

  me: () => api._fetch('/auth/me', { headers: api._headers() }),

  // Categories
  getCategories: () => api._fetch('/categories', { headers: api._headers() }),
  createCategory: (data) => api._fetch('/categories', { method: 'POST', headers: api._headers(), body: JSON.stringify(data) }),
  deleteCategory: (id) => api._fetch('/categories/' + id, { method: 'DELETE', headers: api._headers() }),

  // Transactions
  getTransactions: (params = {}) => {
    const q = new URLSearchParams(Object.entries(params).filter(([, v]) => v)).toString();
    return api._fetch('/transactions' + (q ? '?' + q : ''), { headers: api._headers() });
  },
  createTransaction: (data) => api._fetch('/transactions', { method: 'POST', headers: api._headers(), body: JSON.stringify(data) }),
  updateTransaction: (id, data) => api._fetch('/transactions/' + id, { method: 'PUT', headers: api._headers(), body: JSON.stringify(data) }),
  deleteTransaction: (id) => api._fetch('/transactions/' + id, { method: 'DELETE', headers: api._headers() }),

  // Summary
  getSummary: () => api._fetch('/summary', { headers: api._headers() }),
};

// Guard: redirect to login if not authenticated
function requireAuth() {
  if (!api._token()) {
    window.location.href = getRootPath() + 'index.html';
  }
}

function getRootPath() {
  const p = location.pathname;
  return p.includes('/pages/') ? '../' : './';
}
