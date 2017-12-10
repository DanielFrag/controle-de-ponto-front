<template>
  <div class="layout-padding docs-input row justify-center">
    <div class="custom-input">
      <div class="row justify-center custom-input">
        <q-inline-datetime type="datetime" v-model="date" color="primary" format24h/>
      </div>
      <div class="custom-input">
        <q-select
          stack-label="Descrição (opcional)"
          inverted
          color="secondary"
          separator
          v-model="select"
          :options="options"
        />
      </div>
      <div class="custom-input">
        <q-input type="textarea" v-model="obs" color="secondary" inverted :min-rows="5" :placeholder="'Observação (opcional)'"/>
      </div>
      <br/>
      <br/>
      <br/>
      <q-btn round ref="submitButton" @click="submitConfirm" class="fixed" style="right: 18px; bottom: 18px" color="primary" glossy>
        <q-icon name="add"/>
      </q-btn>
    </div>
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
    clickOnSubmitButton () {
      this.$refs.submitButton.click()
    },
    reset () {
      this.date = new Date()
      this.select = ''
      this.obs = ''
    },
    submitConfirm () {
      this.date.setSeconds(0)
      this.date.setMilliseconds(0)
      Dialog.create({
        title: 'Confirmação',
        message: `Deseja realmente enviar o registro ${this.date.toLocaleString()}`,
        buttons: [
          {
            label: 'Cancelar',
            handler () {}
          }, {
            label: 'Ok',
            handler: () => {
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
                .finally(() => {
                  this.reset()
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
.custom-input {
  width: 500px;
  max-width: 90vw;
}
</style>
