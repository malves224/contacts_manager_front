import HttpService from './http';

class ContactService extends HttpService {
    constructor() {
        super();
    }

    async create(contact) {
        const response = await this.client.post('/contacts', contact)
        return response.data
    }

    async search(params) {
        const response = await this.client.get(`/contacts/search?value=${params.value}&order=${params.order}`)
        return response.data
    }

    async delete(id) {
        const response = await this.client.delete(`/contacts/${id}`)
        return response.data
    }

    async get(id) {
        const response = await this.client.get(`/contacts/${id}`)
        return response.data
    }

    async update(contact) {
        console.log('clinete', this)
        const response = await this.client.put(`/contacts/${contact.id}`, contact)
        return response.data
    }
}

export default ContactService;