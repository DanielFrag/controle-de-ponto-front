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
        Inserir Registro
      </q-toolbar-title>
      
    </q-toolbar>
    <c-insert></c-insert>
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
  import CInsert from './custom/CInsert'
  export default {
    name: 'insert',
    components: {
      CInsert,
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
