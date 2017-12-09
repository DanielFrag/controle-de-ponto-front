<template>
  <div class="layout-padding docs-input row justify-center">
    <div style="width: 500px; max-width: 90vw;">
      <form>
        <p class="caption">Selecione o Dia</p>
        <q-datetime color="secondary" v-model="day" class="full-width"/>
        <q-btn big @click="submit" class="full-width custom-btn" color="primary">
          Buscar Registros
        </q-btn>
      </form>
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
    submit () {
      if (!this.day) {
        Toast.create['negative']({
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
            this.$store.commit('ADD_REGISTERS', res.body.dateRegisters)
            Events.$emit('registers-stored')
          }
        }, errorRes => {
          if (parseInt(errorRes.status / 100) === 4) {
            this.$router.replace('/')
          }
          else {
            Toast.create['negative']({
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
