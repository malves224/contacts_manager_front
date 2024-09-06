<template lang="">
  <div>
    <CreateContact :id="idToEdit" @updated="contactUpdated"  @created="getData" :open="modalOpen" @close="modalOpen = false"></CreateContact>
    <div class="navbar-container">
      <h1>Contatos</h1>
      <b-button @click="deleteSelf" variant="outline-danger">Deletar conta</b-button>
      <b-button @click="logout" variant="outline-danger">Sair</b-button>
    </div>
    <div class="contacts-container">
        <div class="list-contacts-container">
          <div class="search-contacts-container">
            <b-form-input class="me-3" @input="getData" v-model="search.value" placeholder="Pesquisar"></b-form-input>
            <b-button-group class="mr-1">
            <b-button @click="togleOrder" title="Align left">
              <i class="bi" :class="search.order === 'asc' ? 'bi-sort-down-alt' : 'bi-sort-up'"></i> 
            </b-button>
            <b-button @click="openModal(null)">Criar</b-button>
            </b-button-group>
          </div>
          <div class="items-contacts-container">
            <b-table 
              :items="items"
              :fields="fields"
              tbody-tr-class="contact-row"
              @row-clicked="onRowClicked"
            >
            <template #cell(id)="{item}">
              <i class="me-2 bi bi-pen cursor-pointer" @click="openModal(item.id)"></i>
              <i class="bi bi-trash cursor-pointer" @click="deleteItem(item.id)"></i>
            </template>
            </b-table>
          </div>
        </div>
        <div class="google-maps-container">
          <l-map ref="map" v-model:zoom="zoom" :center="center">
            <l-tile-layer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              layer-type="base"
              name="OpenStreetMap"
            >
    
          </l-tile-layer>
            <l-marker v-for="marker in markers" :key="marker[0]" :lat-lng="marker">
            </l-marker>
          </l-map>
        </div>
    </div>
  </div>
</template>
<script>
import UserService from '../services/UserService';
import CreateContact from '../components/CreateContact';
import ContactService from '@/services/ContactService';
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import Swal from 'sweetalert2';

export default {
  components: {
    CreateContact,
    LMap,
    LTileLayer,
    LMarker
  },
  data() {
    return {
      modalOpen: false,
      idToEdit: null,
      userService: new UserService(),
      contactService: new ContactService(),
      fields: [
        { key: 'name', label: 'Nome' },
        { key: 'phone', label: 'Telefone' },
        { key: 'doc', label: 'CPF' },
        { key: 'id', label: 'Ação' }
      ],
      items: [],
      search: {
        value: '',
        order: 'asc'
      },
      markers: [],
      center: [-23.5906812, -46.4123386],
      loading: null,
      zoom: 4
    }
  },
  beforeMount() {
    const token = this.userService.storage.get().token
    if (!token) {
      this.$router.push('/login')
    }
  },
  async mounted() {
    this.getData()
  },
  methods: {
    async deleteSelf() {
      Swal.fire({
        title: 'Tem certeza que deseja deletar sua conta?',
        text: 'Isto não pode ser desfeito e todos os seus contatos serão deletados também.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await this.userService.delete();
            this.$router.push('/login');
          } catch (error) {
            console.log(error)
          }
        }
      })
    },
    logout() {
      this.userService.storage.clear();
      this.$router.push('/login');
    },
    togleOrder() {
      if (this.search.order === 'asc') {
        this.search.order = 'desc'
      } else {
        this.search.order = 'asc'
      }
      this.getData()
    },
    onRowClicked(item) {
      if (!this.markers.find(marker => marker[0] === Number(item.address.latitude) && marker[1] === Number(item.address.longitude))) {
        this.markers.push([Number(item.address.latitude), Number(item.address.longitude)])
      }
      this.center = [Number(item.address.latitude), Number(item.address.longitude)]
      this.zoom = 18
    },
    async deleteItem(id) {
      await this.contactService.delete(id)
      this.getData()
    },
    openModal(id) {
      this.idToEdit = id
      this.modalOpen = true
    },
    async getData() {
      try {
        this.loading = true
        const response = await this.contactService.search(this.search)
        this.items = response
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  },
}
</script>
<style >
.navbar-container {
  display: flex;
  justify-content: space-between;
  padding: 2px 20px;
  margin-bottom: 10px;
  width: 100%;
  height: 40px;
}

.contacts-container {
  display: flex;
}

.list-contacts-container {
  display: flex;
  width: 40%;
  flex-direction: column;
  margin-right: 20px;
}

.search-contacts-container {
  display: flex;
  flex-direction: row;
  padding: 10px;
}

.google-maps-container {
  width: 60%;
  height: 500px;
  z-index: 2;
}

.cursor-pointer {
  cursor: pointer;
}
</style>