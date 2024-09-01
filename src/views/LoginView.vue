<template lang="">
  <div class="login-container" >
        <b-card class="card-login ">
          <b-form v-if="!toggleCadastrate" class="form-login" >
            <b-form-group label="Email" label-for="email">
              <b-form-input id="email" v-model="email" type="email" required placeholder="Email"></b-form-input>
            </b-form-group>
            <b-form-group label="Senha" label-for="password">
              <b-form-input id="password" v-model="password" type="password" required placeholder="Senha"></b-form-input>
              <b-button v-if="email" class="button-none" @click="forgotPassword">Esqueci minha senha</b-button>
            </b-form-group>
            <div>
              <b-button class="me-3" @click="toggleCadastrate = true" variant="outline-info">Cadastrar </b-button>
              <b-button @click="login" variant="outline-primary">Acessar</b-button>
            </div>
          </b-form>
          <b-form v-if="toggleCadastrate" class="form-login" >
            <b-form-group label="Name" label-for="name">
              <b-form-input id="name" v-model="name" required placeholder="Nome"></b-form-input>
            </b-form-group>
            <b-form-group label="Email" label-for="email">
              <b-form-input id="email" v-model="email" type="email" required placeholder="Email"></b-form-input>
            </b-form-group>
            <b-form-group label="Senha" label-for="password">
              <b-form-input id="password" v-model="password" type="password" required placeholder="Senha"></b-form-input>
            </b-form-group>
            <div>
              <b-button class="me-3" @click="toggleCadastrate = false" variant="outline-info">Cancelar </b-button>
              <b-button @click="register" variant="outline-primary">Cadastrar</b-button>
            </div>
          </b-form>
        </b-card>
      </div>
</template>
<script>
import UserService from '../services/UserService';
import Swal from 'sweetalert2';
export default {
  beforeMount() {
    const token = this.userService.storage.get().token
    if (token) {
      this.$router.push('/contacts')
    }
  },
  data() {
    return {
      toggleCadastrate: false,
      name: '',
      email: '',
      password: '',
      cadastred: false,
      userService: new UserService()
    }
  },
  methods: {
    async login() {
      try {
        await this.userService.login(this.email, this.password)
        this.$router.push('/contacts')
      } catch (error) {
        Swal.fire("Erro!", error.response.data.errors[0], "error")
      }

    },
    async register() {
      try {
        await this.userService.register(this.name, this.email, this.password)
        this.cadastred = true
        this.toggleCadastrate = false
        this.password = ''
        Swal.fire("Cadastro efetuado com sucesso!", "Entre com a sua nova conta para continuar.", "success")
      } catch (error) {
        if (error.response.status === 422) {
          Swal.fire("Erro!", error?.response?.data?.errors[0], "error")
        }
      }
    },
    async forgotPassword() {
      try {
        await this.userService.forgotPassword(this.email)
        Swal.fire("Email enviado com sucesso!", "Verifique seu email para recuperar sua senha.", "success")
      } catch (error) {
        if (error.response?.data?.errors) {
          Swal.fire("Erro!", error?.response?.data?.errors[0], "error")
        }
      }
    }
  },
}
</script>
<style>
.login-container {
  display: flex;
  margin: 0;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

.card-login {
  width: 40vh;
  min-height: 250px;
}

.form-login {
  justify-content: space-evenly;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>