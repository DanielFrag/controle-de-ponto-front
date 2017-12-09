<template>
  <q-layout
    ref="layout"
    view="lHh Lpr fff"
    :left-class="{'bg-grey-2': true}"
  >    
    <q-toolbar>
      <q-toolbar-title>
        Menu
      </q-toolbar-title>
      <q-btn flat>
        <q-icon name="more_vert" />
        <q-popover ref="popover">
          <div>
            <q-btn flat color="primary" @click="$refs.popover.close(), logout()">
              Sair
            </q-btn>
          </div>
        </q-popover>
      </q-btn>
    </q-toolbar>
    <div class="layout-padding docs-input row justify-center">
      <q-btn big color="secondary" class="full-width custom-btn" icon="add" @click="navTo('insert')">
        Inserir Registro
      </q-btn>
      <q-btn big color="secondary" class="full-width custom-btn" icon="search" @click="navTo('search')">
        Consultar
      </q-btn>
      <q-btn big color="secondary" class="full-width custom-btn" icon="delete" @click="navTo('delete')">
        Deletar Registro
      </q-btn>
    </div>
    <q-toolbar inverted color="secondary" class="layout-padding row justify-center fixed" style="bottom: 18px">
      Olá {{ user }}!
    </q-toolbar>
  </q-layout>
</template>

<script>
  import {
    QBtn,
    QIcon,
    QLayout,
    QPopover,
    QToolbar,
    QToolbarTitle
  } from 'quasar'
  export default {
    name: 'menu',
    components: {
      QBtn,
      QIcon,
      QLayout,
      QPopover,
      QToolbar,
      QToolbarTitle
    },
    computed: {
      user () {
        return this.$store.state.user
      }
    },
    methods: {
      logout () {
        this.$http
          .post(`${process.env.API}/logout`, {}, {
            headers: {
              Authorization: 'bearer ' + this.$store.state.token
            }
          })
          .then(res => {
            this.$store.commit('SET_TOKEN', '')
            this.$store.commit('SET_USER', '')
          })
          .catch(() => {})
          .finally(() => {
            this.$router.replace('/')
          })
      },
      navTo (location) {
        this.$router.push(location)
      }
    }
  }
</script>

<style scoped>
.custom-btn {
  margin: 10px;
}
</style>
