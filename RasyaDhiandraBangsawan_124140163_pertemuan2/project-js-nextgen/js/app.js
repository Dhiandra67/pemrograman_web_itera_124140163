// Logika aplikasi: class TaskItem & DashboardApp (diekspor ke main.js)
import { STORAGE_KEY, fetchSeedTasks } from './modules/data.js';
import { uid } from './modules/utils.js';

export class TaskItem {
  constructor({ id = uid(), title, course = '', deadline = '', priority = 'sedang', done = false }) {
    Object.assign(this, { id, title: title.trim(), course: course.trim(), deadline, priority, done });
  }
}

export class DashboardApp {
  #tasks = [];

  // Inisialisasi async: baca localStorage, atau isi awal dari API saat pertama kali dibuka
  async init() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw !== null) {
      this.#tasks = JSON.parse(raw).map((data) => new TaskItem(data));
      return;
    }
    try {
      const seeds = await fetchSeedTasks();
      this.#tasks = seeds.map((seed) => new TaskItem(seed));
    } catch (err) {
      console.warn('Data awal gagal dimuat:', err.message);
    }
    this.#save();
  }

  #save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.#tasks));
  }

  // Array state tidak dimutasi: selalu dibuat ulang dengan spread operator
  add(data) {
    this.#tasks = [new TaskItem(data), ...this.#tasks];
    this.#save();
  }

  update(id, changes) {
    this.#tasks = this.#tasks.map((task) => (task.id === id ? new TaskItem({ ...task, ...changes }) : task));
    this.#save();
  }

  toggle(id) {
    const { done } = this.find(id);
    this.update(id, { done: !done });
  }

  remove(id) {
    this.#tasks = this.#tasks.filter((task) => task.id !== id);
    this.#save();
  }

  find = (id) => this.#tasks.find((task) => task.id === id);

  filtered = (mode = 'semua') =>
    this.#tasks.filter(({ done }) => mode === 'semua' || (mode === 'selesai' ? done : !done));

  stats() {
    const total = this.#tasks.length;
    const done = this.#tasks.filter(({ done }) => done).length;
    return { total, done, active: total - done };
  }
}
