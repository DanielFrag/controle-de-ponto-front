<template>
  <q-layout
    ref="layout"
    view="lHh Lpr fff"
    :left-class="{'bg-grey-2': true}"
  >
    <q-toolbar slot="header" class="glossy">
      <q-toolbar-title class="justify-center">
        Controle de Ponto
      </q-toolbar-title>
    </q-toolbar>
    <c-form></c-form>
  </q-layout>
</template>

<script>
  import {
    QLayout,
    QToolbar,
    QToolbarTitle
  } from 'quasar'
  import CForm from './custom/CLoginForm.vue'
  export default {
    name: 'login',
    components: {
      QLayout,
      QToolbar,
      QToolbarTitle,
      CForm
    }
  }
</script>
