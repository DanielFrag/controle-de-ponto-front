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
        Consultar
      </q-toolbar-title>
    </q-toolbar>
    <c-search></c-search>
    <c-summary></c-summary>
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
  import CSummary from './custom/CSummary'
  import CSearch from './custom/CSearch'
  export default {
    name: 'search',
    components: {
      CSummary,
      CSearch,
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
