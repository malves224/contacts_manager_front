<template lang="">
  <div @click="close" v-if="open" class="modal-contact">
    <b-form @submit.prevent="submitForm" class="form-create-contact">
      <b-form-group label-for="name">
        <b-form-input id="name" v-model="name" placeholder="Nome"></b-form-input>
        <span v-if="v$.name.$error">Nome é obrigatório.</span>
      </b-form-group>
      <b-form-group label-for="doc">
        <b-form-input id="doc" v-model="doc" placeholder="CPF"></b-form-input>
        <span v-if="v$.doc.$error">CPF é invalido.</span>
      </b-form-group>
      <b-form-group label-for="phone">
        <b-form-input id="phone" v-model="phone" placeholder="Telefone"></b-form-input>
        <span v-if="v$.phone.$error">Telefone é obrigatório.</span>
      </b-form-group>
      <b-form-group label="Endereço" label-for="address">
        <b-form-group label-for="postal_code">
          <b-form-input id="postal_code" v-model="postal_code" placeholder="CEP"></b-form-input>
          <span v-if="v$.postal_code.$error">CEP é obrigatório.</span>
        </b-form-group>
        <b-form-group label-for="street">
          <b-form-input id="street" v-model="street" placeholder="Rua"></b-form-input>
          <span v-if="v$.street.$error">Rua é obrigatório.</span>
        </b-form-group>
        <b-form-group label-for="city">
          <b-form-input id="city" v-model="city" placeholder="Cidade"></b-form-input>
          <span v-if="v$.city.$error">Cidade é obrigatório.</span>
        </b-form-group>
        <b-form-group label-for="state">
          <b-form-input id="state" v-model="state" placeholder="Estado"></b-form-input>
          <span v-if="v$.state.$error">Estado é obrigatório.</span>
        </b-form-group>
        <b-form-group label-for="complement">
          <b-form-input id="complement" v-model="complement" placeholder="Complemento"></b-form-input>
        </b-form-group>
      </b-form-group>
      <b-button class="me-2" variant="outline-danger" @click="this.$emit('close')">Cancelar</b-button>
      <b-button type="submit" variant="outline-primary">Cadastrar</b-button>
    </b-form>
  </div>
</template>
<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { helpers } from '@vuelidate/validators';
import { isCPF } from 'validation-br'

const isValidCPFFormat = helpers.withMessage('', value => {
  return isCPF(value);
});

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      name: '',
      doc: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      postal_code: '',
      complement: ''
    }
  },
  validations() {
    return {
      name: {
        required,
      },
      doc: {
        required, isValidCPFFormat
      },
      phone: {
        required,
      },
      street: {
        required,
      },
      city: {
        required,
      },
      state: {
        required,
      },
      postal_code: {
        required,
      }
    }
  },
  props: ['open'],
  methods: {
    close({ target }) {
      if (target.className === 'modal-contact') {
        this.$emit('close')
      }
    },
    async submitForm() {
      const isFormCorrect = await this.v$.$validate()
      if (isFormCorrect) return
    }
  }
}
</script>
<style>
.modal-contact {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #21252987;
  z-index: 99999;
}

.form-create-contact {
  min-height: 60%;
  width: 40%;
  background-color: white;
  z-index: 999999;
}

.form-create-contact {
  padding: 15px;
}
</style>