import HttpService from './http';

class UserService extends HttpService {
  constructor() {
    super();
  }

  async login(email, password) {
    const response = await this.client.post('/login', { email, password })
    this.storage.set({ token: response.data.token, id: response.data.id })
    return response.data
  }

  async register(name, email, password) {
    const response = await this.client.post('users', { name, email, password })
    return response.data
  }

  async forgotPassword(email) {
    const response = await this.client.post('/forgot_password/', { email })
    return response.data
  }

  async delete() {
    const response = await this.client.delete('/users/self_destroy')
    this.storage.clear()
    return response.data
  }
  
}
export default UserService;