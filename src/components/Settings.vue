<template>
  <q-layout
    ref="layout"
    view="lHh Lpr fff"
    :left-class="{'bg-grey-2': true}"
  >    
    <q-toolbar>
      <q-btn flat @click="back">
        <q-icon name="keyboard_arrow_left"/>
      </q-btn>

      <q-toolbar-title>
        Configurações
      </q-toolbar-title>
      
    </q-toolbar>
    <c-change-password></c-change-password>
  </q-layout>
</template>

<script>
  import {
    QBtn,
    QIcon,
    QLayout,
    QToolbar,
    QToolbarTitle
  } from 'quasar'
  import CChangePassword from './custom/CChangePassword'
  export default {
    name: 'delete',
    components: {
      CChangePassword,
      QBtn,
      QIcon,
      QLayout,
      QToolbar,
      QToolbarTitle
    },
    methods: {
      back () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>

</style>