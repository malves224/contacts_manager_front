<template lang="">
  <div class="login-container" >
        <b-card class="card-login ">
          <b-form class="form-login" >
            <b-form-group label="Email" label-for="email">
              <b-form-input id="email" v-model="email" type="email" required placeholder="Email"></b-form-input>
            </b-form-group>
            <b-form-group label="Senha" label-for="password">
              <b-form-input id="password" v-model="password" type="password" required placeholder="Senha"></b-form-input>
            </b-form-group>
            <div>
              <b-button  class="me-3" type="submit" variant="outline-primary">Acessar</b-button>
              <b-button variant="outline-info">Cadastrar </b-button>
            </div>
          </b-form>
        </b-card>
      </div>
</template>
<script>
export default {

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
  height: 280px;
}

.form-login {
  justify-content: space-evenly;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>