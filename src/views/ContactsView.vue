<template lang="">
  <div>
    <CreateContact :open="modalOpen" @close="modalOpen = false"></CreateContact>
    <div class="navbar-container">
      <b-button variant="outline-danger">Sair</b-button>
    </div>
    <div class="contacts-container">
        <div class="list-contacts-container">
          <div class="search-contacts-container">
            <b-form-input placeholder="Pesquisar"></b-form-input>
            <b-button @click="openModal">Criar contato</b-button>
          </div>
          <div class="items-contacts-container">
            <b-list-group>
              <b-list-group-item>Item 1</b-list-group-item>
              <b-list-group-item>Item 2</b-list-group-item>
              <b-list-group-item>Item 3</b-list-group-item>
            </b-list-group>
          </div>
        </div>
        <div class="google-maps-container">
          maps      
        </div>
    </div>
  </div>
</template>
<script>
import UserService from '../services/UserService';
import CreateContact from '../components/CreateContact';

export default {
  components: {
    CreateContact
    },
  data() {
    return {
      modalOpen: false,
      userService: new UserService(),
    }
  },
  beforeMount() {
    const token = this.userService.storage.get().token
    if (!token) {
      this.$router.push('/login')
    }
  },
  methods: {
    openModal() {
      this.modalOpen = true
    }
  },
}
</script>
<style >
  .navbar-container {
    display: flex;
    justify-content: end;
    padding: 0 20px;
    width: 100%;
    background-color: aquamarine;
    height: 40px;
  }
  .contacts-container {
    display: flex;
  }
  .list-contacts-container {
    display: flex;
    width: 40%;
    flex-direction: column;
  }
  .search-contacts-container {
    display: flex;
    flex-direction: row;
  }
</style>