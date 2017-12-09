<template>
  <div class="layout-padding docs-input row justify-center">
    <form>
      <q-inline-datetime type="datetime" v-model="date" color="secondary"/>
      <q-input type="textarea" v-model="description" color="secondary" inverted :min-rows="5" :placeholder="'Descrição'"/>
      <br/>
      <br/>
      <br/>
      <q-btn round @click="submitConfirm" class="fixed" style="right: 18px; bottom: 18px" color="primary" glossy>
        <q-icon name="add"/>
      </q-btn>
    </form>
  </div>
</template>

<script>
import {
  Dialog,
  QBtn,
  QIcon,
  QInlineDatetime,
  QInput,
  Toast
} from 'quasar'
export default {
  name: 'cInsert',
  components: {
    QBtn,
    QIcon,
    QInlineDatetime,
    QInput
  },
  data () {
    return {
      date: new Date(),
      description: ''
    }
  },
  methods: {
    submitConfirm () {
      Dialog.create({
        title: 'Confirmação',
        message: 'Deseja realmente enviar o registro',
        buttons: [
          {
            label: 'Cancelar',
            handler () {}
          }, {
            label: 'Ok',
            handler: () => {
              this.$http
                .post(`${process.env.API}/user/register-date`, {
                  timeStamp: this.date,
                  description: this.description
                }, {
                  headers: {
                    Authorization: 'bearer ' + this.$store.state.token
                  }
                })
                .then(res => {
                  this.$store.commit('SET_TOKEN', res.body.token)
                }, errorRes => {
                  if (parseInt(errorRes.status / 100) === 4) {
                    this.$router.replace('/')
                  }
                  else {
                    Toast.create['negative']({
                      html: 'Erro ao criar registro'
                    })
                  }
                })
                .finally(() => {})
            }
          }
        ]
      })
    }
  }
}
</script>
