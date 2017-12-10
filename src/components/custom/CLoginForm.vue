<template>
  <div class="layout-padding docs-input row justify-center">
    <div class="custom-input">
      <q-input type="text" v-model="login" @keyup.enter="clickOnSubmit" :placeholder="pt.placeholder.login"/>
      <q-input type="password" v-model="password" @keyup.enter="clickOnSubmit" :placeholder="pt.placeholder.password"/>
      <q-btn loader big color="primary" ref="submitButton" @click="ajaxSubmit">
        Enviar
        <span slot="loading">Enviando...</span>
      </q-btn>
    </div>
  </div>
</template>

<script>
import {
  QBtn,
  QInput,
  Toast
} from 'quasar'
export default {
  name: 'cLoginForm',
  components: {
    QBtn,
    QInput
  },
  created () {
    if (this.$store.state.token) {
      this.$http
        .get(`${process.env.API}/renew-token`, {
          headers: {
            Authorization: 'bearer ' + this.$store.state.token
          }
        })
        .then(res => {
          this.$store.commit('SET_TOKEN', res.body.token)
          this.$router.push({
            name: 'menu'
          })
        })
        .catch(() => {})
    }
  },
  data () {
    return {
      pt: {
        placeholder: {
          login: 'Login',
          password: 'Senha'
        },
        loginError: 'Erro ao efetuar login'
      },
      login: '',
      password: ''
    }
  },
  methods: {
    clickOnSubmit () {
      this.$refs.submitButton.click()
    },
    ajaxSubmit (e, done) {
      this.$http
        .post(`${process.env.API}/login`, {
          login: this.login,
          password: this.password
        })
        .then(res => {
          done()
          this.$store.commit('SET_TOKEN', res.body.token)
          this.$store.commit('SET_USER', res.body.login)
          this.$router.push({
            name: 'menu'
          })
        }, errorRes => {
          done()
          this.reset()
          Toast.create.negative({
            html: this.pt.loginError
          })
        })
    },
    reset () {
      this.login = ''
      this.password = ''
    }
  }
}
</script>
<style scoped>
.custom-input {
  width: 500px;
  max-width: 90vw;
}
</style>

