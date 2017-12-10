<template>
  <div>
    <q-list inset-separator v-for="d in data" :key="d.id">
      <q-item @click="deleteConfirm(d.id, d.date, d.time)">
        <q-item-main>
          <q-item-tile label>
            {{ d.time }}
          </q-item-tile>
          <q-item-tile sublabel>
            {{ d.description }}
          </q-item-tile>
        </q-item-main>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import {
  Dialog,
  QItem,
  QItemMain,
  QItemSeparator,
  QItemTile,
  QList,
  Toast
} from 'quasar'
export default {
  name: 'cRegisters',
  components: {
    QItem,
    QItemMain,
    QItemSeparator,
    QItemTile,
    QList
  },
  computed: {
    registers () {
      return this.$store.state.registers
    }
  },
  created () {
    this.$q.events.$on('registers-stored', this.populateView)
  },
  beforeDestroy () {
    this.$q.events.$off('registers-stored', this.populateView)
  },
  data () {
    return {
      data: []
    }
  },
  methods: {
    populateView () {
      this.data = []
      this.registers.forEach(r => {
        const date = new Date(r.timeStamp)
        date.setSeconds(0)
        this.data.push({
          date: date.toLocaleDateString(),
          time: date.toLocaleTimeString(),
          description: r.description,
          id: r._id
        })
      })
    },
    deleteConfirm (id, date, time) {
      Dialog.create({
        title: 'Confirmação',
        message: `Deseja realmente deletar o registro das ${time} de ${date}`,
        buttons: [
          {
            label: 'Cancelar',
            handler () {}
          }, {
            label: 'Ok',
            handler: () => {
              this.$http
                .delete(`${process.env.API}/user/remove-register/${id}`, {
                  headers: {
                    Authorization: 'bearer ' + this.$store.state.token
                  }
                })
                .then(res => {
                  this.$store.commit('SET_TOKEN', res.body.token)
                  this.data = []
                  Toast.create.positive({
                    html: 'Item deletado com sucesso'
                  })
                }, errorRes => {
                  if (parseInt(errorRes.status / 100) === 4) {
                    this.$router.replace('/')
                  }
                  else {
                    Toast.create.negative({
                      html: 'Erro ao deletar registro'
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
