<template>
  <div class="layout-padding docs-input row justify-center">
    <form>
      <q-inline-datetime type="datetime" v-model="date" color="primary" format24h/>
      <q-select
        stack-label="Descrição"
        inverted
        color="secondary"
        separator
        v-model="select"
        :options="options"
      />
      <q-input type="textarea" v-model="obs" color="secondary" inverted :min-rows="5" :placeholder="'Observação'"/>
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
  QSelect,
  Toast
} from 'quasar'
export default {
  name: 'cInsert',
  components: {
    QBtn,
    QIcon,
    QInlineDatetime,
    QInput,
    QSelect
  },
  data () {
    return {
      date: new Date(),
      obs: '',
      options: [{
        label: '',
        value: ''
      }, {
        label: 'Entrada',
        value: 'Entrada'
      }, {
        label: 'Saída',
        value: 'Saída'
      }],
      select: ''
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
              this.date.setSeconds(0)
              this.date.setMilliseconds(0)
              let description = ''
              if (this.select) {
                description = `${this.select}`
              }
              if (this.obs) {
                description = `${description}: ${this.obs}`
              }
              this.$http
                .post(`${process.env.API}/user/register-date`, {
                  timeStamp: this.date,
                  description
                }, {
                  headers: {
                    Authorization: 'bearer ' + this.$store.state.token
                  }
                })
                .then(res => {
                  this.$store.commit('SET_TOKEN', res.body.token)
                  Toast.create.positive({
                    html: 'Registro enviado'
                  })
                }, errorRes => {
                  if (parseInt(errorRes.status / 100) === 4) {
                    this.$router.replace('/')
                  }
                  else {
                    Toast.create.negative({
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
