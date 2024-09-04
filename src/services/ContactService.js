import HttpService from './http';

class ContactService extends HttpService {
    constructor() {
        super();
    }

    async create(contact) {
        const response = await this.client.post('/contacts', contact)
        return response.data
    }
}

export default ContactService;