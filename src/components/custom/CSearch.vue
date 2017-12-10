<template>
  <div class="layout-padding docs-input row justify-center">
    <div style="width: 500px; max-width: 90vw;">
      <form @submit.prevent="clickOnSubmitButton">
        <p class="caption">Selecione os Dias</p>
        <q-datetime-range color="secondary" v-model="range" class="full-width"/>
        <q-btn ref="submitButton" big @click="submit" class="full-width custom-btn" color="primary">
          Enviar Consulta
        </q-btn>
      </form>
    </div>
  </div>
</template>

<script>
import {
  Events,
  QBtn,
  QDatetimeRange,
  QIcon,
  QInput,
  Toast
} from 'quasar'
export default {
  name: 'cSearch',
  components: {
    QBtn,
    QDatetimeRange,
    QIcon,
    QInput
  },
  data () {
    return {
      range: {
        from: new Date(),
        to: new Date()
      }
    }
  },
  methods: {
    clickOnSubmitButton () {
      this.$refs.submitButton.click()
    },
    submit () {
      if (!this.range.from || !this.range.to) {
        Toast.create.negative({
          html: 'Data em branco'
        })
        return
      }
      let startDate = new Date(this.range.from)
      let finishDate = new Date(this.range.to)
      startDate.setHours(0)
      startDate.setMinutes(0)
      finishDate.setHours(23)
      finishDate.setMinutes(59)
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
            this.$store.commit('ADD_REGISTERS', res.body.dateRegisters)
            Events.$emit('registers-stored')
          }
          else {
            Toast.create.info({
              html: 'Nenhum registro encontrado'
            })
          }
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
        .finally(() => {})
    }
  }
}
</script>

<style scoped>
.custom-btn {
  margin: 10px;
}
</style>
