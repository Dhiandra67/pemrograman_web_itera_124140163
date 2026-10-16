// Entry point: event listener + update DOM
import { DashboardApp } from './app.js';
import { fetchWeather, fetchQuote, weatherLabel } from './modules/data.js';
import { escapeHtml, formatDate, daysLeft } from './modules/utils.js';

const app = new DashboardApp();
const $ = (selector) => document.querySelector(selector);
const els = {
  list: $('#task-list'), form: $('#task-form'), stats: $('#stats'), weather: $('#weather'), quote: $('#quote'),
  title: $('#form-title'), submit: $('#submit-btn'), cancel: $('#cancel-btn'), today: $('#today'),
};
let filter = 'semua';
let editingId = null;

const dueBadge = (deadline, done) => {
  if (!deadline || done) return '';
  const left = daysLeft(deadline);
  const [text, cls] = left < 0 ? [`Terlambat ${-left} hari`, 'late']
    : left === 0 ? ['Tenggat hari ini', 'soon']
    : [`${left} hari lagi`, left <= 2 ? 'soon' : 'ok'];
  return `<span class="badge ${cls}">${text}</span>`;
};

const taskTemplate = ({ id, title, course, deadline, priority, done }) => `
  <li class="task ${done ? 'done' : ''}" data-id="${id}">
    <input type="checkbox" data-action="toggle" ${done ? 'checked' : ''} aria-label="Tandai selesai: ${escapeHtml(title)}">
    <div class="body">
      <strong>${escapeHtml(title)}</strong>
      <small>${escapeHtml(course) || 'Umum'}, ${formatDate(deadline)}</small>
    </div>
    <div class="meta">
      <span class="badge p-${priority}">${priority}</span>
      ${dueBadge(deadline, done)}
      <button data-action="edit">Edit</button>
      <button data-action="delete">Hapus</button>
    </div>
  </li>`;

const render = () => {
  const tasks = app.filtered(filter);
  els.list.innerHTML = tasks.length
    ? tasks.map(taskTemplate).join('')
    : '<li class="empty">Belum ada tugas di sini. Tambahkan lewat form di atas.</li>';
  const { total, done, active } = app.stats();
  els.stats.innerHTML = `<div><b>${total}</b>Total</div><div><b>${active}</b>Belum selesai</div><div><b>${done}</b>Selesai</div>`;
};

const stopEditing = () => {
  editingId = null;
  els.form.reset();
  els.title.textContent = 'Tambah tugas';
  els.submit.textContent = 'Tambah tugas';
  els.cancel.hidden = true;
};

els.form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(els.form));
  editingId ? app.update(editingId, data) : app.add(data);
  stopEditing();
  render();
});

els.cancel.addEventListener('click', stopEditing);

els.list.addEventListener('click', ({ target }) => {
  const { action } = target.dataset;
  const id = target.closest('.task')?.dataset.id;
  if (!action || !id) return;
  if (action === 'toggle') app.toggle(id);
  if (action === 'delete' && confirm('Hapus tugas ini?')) app.remove(id);
  if (action === 'edit') {
    const { title, course, deadline, priority } = app.find(id);
    Object.entries({ title, course, deadline, priority }).forEach(([name, value]) => { els.form.elements[name].value = value; });
    editingId = id;
    els.title.textContent = 'Edit tugas';
    els.submit.textContent = 'Simpan perubahan';
    els.cancel.hidden = false;
    els.form.elements.title.focus();
    return;
  }
  render();
});

document.querySelectorAll('[data-filter]').forEach((btn) =>
  btn.addEventListener('click', () => {
    filter = btn.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach((b) => b.classList.toggle('active', b === btn));
    render();
  }));

const loadWidgets = async () => {
  const [weather, quote] = await Promise.allSettled([fetchWeather(), fetchQuote()]);
  els.weather.innerHTML = weather.status === 'fulfilled'
    ? `Kampus ITERA, Lampung Selatan<b>${weather.value.temperature}°C</b>${weatherLabel(weather.value.weathercode)}, angin ${weather.value.windspeed} km/j`
    : 'Cuaca belum bisa dimuat. Periksa koneksi internet.';
  els.quote.innerHTML = quote.status === 'fulfilled'
    ? `“${escapeHtml(quote.value.quote)}”<cite>${escapeHtml(quote.value.author)}</cite>`
    : 'Kutipan belum bisa dimuat.';
};

els.today.textContent = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
await app.init();
render();
loadWidgets();
