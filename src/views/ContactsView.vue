<template lang="">
  <div>
    <CreateContact @created="getData" :open="modalOpen" @close="modalOpen = false"></CreateContact>
    <div class="navbar-container">
      <b-button variant="outline-danger">Sair</b-button>
    </div>
    <div class="contacts-container">
        <div class="list-contacts-container">
          <div class="search-contacts-container">
            <b-form-input @input="getData" v-model="search.value" placeholder="Pesquisar"></b-form-input>
            <b-button-group class="mr-1">
            <b-button @click="togleOrder" title="Align left">
              <i class="bi" :class="search.order === 'asc' ? 'bi-sort-down-alt' : 'bi-sort-up'"></i> 
            </b-button>
            <b-button @click="openModal">Criar contato</b-button>
            </b-button-group>
          </div>
          <div class="items-contacts-container">
            <b-table 
              :items="items"
              :fields="fields"
              tbody-tr-class="contact-row"
              @row-clicked="onRowClicked"
            >
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
      userService: new UserService(),
      contactService: new ContactService(),
      fields: [
        { key: 'name', label: 'Nome' },
        { key: 'phone', label: 'Telefone' },
        { key: 'doc', label: 'CPF' }
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
    togleOrder() {
      if (this.search.order === 'asc') {
        this.search.order = 'desc'
      } else {
        this.search.order = 'asc'
      }
      this.getData()
    },
    onRowClicked(item) {
      this.markers.push([Number(item.address.latitude), Number(item.address.longitude)])
      this.center = [Number(item.address.latitude), Number(item.address.longitude)]
      this.zoom = 18
    },
    openModal() {
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

.google-maps-container {
  width: 60%;
  height: 500px;
  z-index: 2;
}

.contact-row {
  cursor: pointer;
}
</style>