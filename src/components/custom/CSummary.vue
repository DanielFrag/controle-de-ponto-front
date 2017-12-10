<template>
  <div>
    <blockquote v-if="total">
      <small>
        média: {{ avg.hours }}h e {{avg.minutes}}m
      </small>
    </blockquote>
    <q-list v-for="day in days" :key="day.label">
      <q-collapsible group="days" :label="day.label" :sublabel="day.sublabel">
        <div v-for="dt in day.data" :key="dt.key">
          <div>{{ dt.time }}</div>
          <div>{{ dt.description }}</div>
          <br/>
        </div>
      </q-collapsible>
    </q-list>
  </div>
</template>

<script>
import {
  QCollapsible,
  QList
} from 'quasar'
import moment from 'moment'
export default {
  name: 'cSummary',
  components: {
    QCollapsible,
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
      avg: {},
      total: 0,
      days: []
    }
  },
  methods: {
    populateView () {
      this.days = {}
      if (!this.registers.length) {
        this.total = 0
        return
      }
      this.total = {
        acc: 0,
        hours: 0,
        minutes: 0
      }
      this.registers.forEach(element => {
        const date = new Date(element.timeStamp)
        const key = date.toLocaleDateString()
        if (!this.days[key]) {
          this.days[key] = {}
          this.days[key]['label'] = date.toLocaleDateString()
          this.days[key]['data'] = []
        }
        this.days[key]['data'].push({
          key: date.toISOString(),
          time: date.toLocaleTimeString(),
          description: element.description
        })
      })
      const keys = Object.keys(this.days)
      keys.forEach(k => {
        const dts = []
        this.days[k].data.forEach(d => {
          dts.push(d.key)
        })
        this.days[k].summary = this.calcHours(dts)
        this.total.acc += this.days[k].summary.total ? this.days[k].summary.total : 0
        this.days[k].sublabel = this.days[k].summary.total ? `${this.days[k].summary.hours}h e ${this.days[k].summary.minutes}m` : '???'
      })
      this.total.hours = moment.duration(this.total.acc).get('hours')
      this.total.minutes = moment.duration(this.total.acc).get('minutes')
      this.avg = {
        hours: moment.duration(this.total.acc / keys.length).get('hours'),
        minutes: moment.duration(this.total.acc / keys.length).get('minutes')
      }
    },
    calcHours (dates) {
      if (dates.length && dates.length % 2 !== 0) {
        return {}
      }
      const len = dates.length
      let acc = 0
      for (let i = 0; i < len; i += 2) {
        const d1 = moment(dates[i])
        const d2 = moment(dates[i + 1])
        acc += d2.diff(d1)
      }
      return {
        total: acc,
        hours: moment.duration(acc).get('hours'),
        minutes: moment.duration(acc).get('minutes'),
        seconds: moment.duration(acc).get('seconds')
      }
    }
  }
}
</script>
