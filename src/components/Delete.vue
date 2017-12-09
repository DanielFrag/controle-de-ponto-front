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
        Deletar Registro
      </q-toolbar-title>
      
    </q-toolbar>
    <c-delete></c-delete>
    <c-registers></c-registers>
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
  import CDelete from './custom/CDelete'
  import CRegisters from './custom/CRegisters'
  export default {
    name: 'delete',
    components: {
      QBtn,
      CDelete,
      CRegisters,
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
