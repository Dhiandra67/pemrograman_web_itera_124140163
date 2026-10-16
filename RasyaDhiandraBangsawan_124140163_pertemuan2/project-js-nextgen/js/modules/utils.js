// Fungsi bantu (arrow functions murni)
export const uid = () => `t_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

export const escapeHtml = (text = '') =>
  text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export const formatDate = (iso) =>
  iso ? new Date(`${iso}T00:00:00`).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Tanpa tenggat';

export const daysLeft = (iso) => {
  const today = new Date().setHours(0, 0, 0, 0);
  return Math.round((new Date(`${iso}T00:00:00`) - today) / 864e5);
};
