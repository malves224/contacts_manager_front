import HttpService from './http';

class CepService extends HttpService {
  constructor() {
    super()
  }

  async search(cep) {
    const response = await this.client(`/cep/search/${cep}`)
    return response.data
  }
}

export default CepService;