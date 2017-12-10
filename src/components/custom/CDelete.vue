<template>
  <div class="layout-padding docs-input row justify-center">
    <div style="width: 500px; max-width: 90vw;">
      <p class="caption">Selecione o Dia</p>
      <q-datetime color="secondary" v-model="day" class="full-width"/>
      <q-btn loader big @click="submit" ref="submitButton" class="full-width custom-btn" color="primary">
        Buscar Registros
        <span slot="loading">Buscando...</span>
      </q-btn>
    </div>
  </div>
</template>

<script>
import {
  Events,
  QBtn,
  QDatetime,
  QIcon,
  QInput,
  Toast
} from 'quasar'
export default {
  name: 'cDelete',
  components: {
    QBtn,
    QDatetime,
    QIcon,
    QInput
  },
  data () {
    return {
      day: new Date()
    }
  },
  methods: {
    clickOnSubmitButton () {
      this.$refs.submitButton.click()
    },
    submit (e, done) {
      if (!this.day) {
        Toast.create.negative({
          html: 'Data em branco'
        })
        return
      }
      let startDate = new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate(), 0, 0, 0)
      let finishDate = new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate(), 23, 59, 59)
      this.$http
        .get(`${process.env.API}/user/registers/${startDate.getTime()}/${finishDate.getTime()}`, {
          headers: {
            Authorization: 'bearer ' + this.$store.state.token
          }
        })
        .then(res => {
          this.$store.commit('SET_TOKEN', res.body.token)
          if (res.body.dateRegisters && res.body.dateRegisters.length) {
            res.body.dateRegisters.sort((a, b) => {
              return new Date(a.timeStamp).getTime() - new Date(b.timeStamp).getTime()
            })
          }
          else {
            Toast.create.info({
              html: 'Nenhum registro encontrado'
            })
          }
          this.$store.commit('ADD_REGISTERS', res.body.dateRegisters || [])
          Events.$emit('registers-stored')
        }, errorRes => {
          if (parseInt(errorRes.status / 100) === 4) {
            this.$router.replace('/')
          }
          else {
            Toast.create.negative({
              html: 'Erro ao consultar registros'
            })
          }
        })
        .finally(() => {
          done()
        })
    }
  }
}
</script>

<style scoped>
.custom-btn {
  margin: 10px;
}
</style>
