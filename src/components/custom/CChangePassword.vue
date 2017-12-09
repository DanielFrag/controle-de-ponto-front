<template>
  <div class="layout-padding docs-input row justify-center">
    <q-list class="settings-list">
      <q-collapsible group="settings" label="Mudar senha">
        <form>
          <q-input type="password" v-model="oldPass" placeholder="Senha atual"/>
          <q-input type="password" v-model="newPass" placeholder="Nova senha"/>
          <q-btn loader big color="primary" @click="submitConfirm">
            Enviar
            <span slot="loading">Enviando...</span>
          </q-btn>
        </form>
      </q-collapsible>
    </q-list>
  </div>
</template>

<script>
import {
  Dialog,
  QBtn,
  QCollapsible,
  QInput,
  QList,
  Toast
} from 'quasar'
export default {
  name: 'cInsert',
  components: {
    QBtn,
    QCollapsible,
    QInput,
    QList
  },
  data () {
    return {
      oldPass: '',
      newPass: ''
    }
  },
  methods: {
    submitConfirm (e, done) {
      Dialog.create({
        title: 'Confirmação',
        message: 'Deseja realmente mudar sua senha?',
        buttons: [
          {
            label: 'Cancelar',
            handler () {}
          }, {
            label: 'Ok',
            handler: () => {
              this.$http
                .put(`${process.env.API}/change-password`, {
                  oldPassword: this.oldPass,
                  newPassword: this.newPass
                }, {
                  headers: {
                    Authorization: 'bearer ' + this.$store.state.token
                  }
                })
                .then(res => {
                  this.$store.commit('SET_TOKEN', res.body.token)
                  Toast.create.positive({
                    html: 'Senha alterada'
                  })
                }, errorRes => {
                  if (parseInt(errorRes.status / 100) === 4) {
                    this.$router.replace('/')
                  }
                  else {
                    Toast.create.negative({
                      html: 'Erro ao mudar senha'
                    })
                  }
                })
                .finally(() => {
                  done()
                })
            }
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
.settings-list {
  width: 500px;
  max-width: 90vw;
}
</style>
