class LocalStorage {
  constructor(key) {
      this.key = key
  }

  get() {
      const data = localStorage.getItem(this.key);
      return data ? JSON.parse(data) : []
  }

  set(data) {
      return localStorage.setItem(this.key, JSON.stringify(data));
  }

  clear() {
      return localStorage.removeItem(this.key);
  }
}

export default LocalStorage