
<template>
  <div id="chart" class="live-chart">
    <apexchart
      width="100%"
      height="300"
      type="line"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const series = ref([
  {
    name: 'ETH/USD',
    data: []
  }
])

const chartOptions = ref({
  chart: {
    id: 'eth-chart',
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: { speed: 1000 }
    }
  },
  stroke: { curve: 'smooth' },
  xaxis: {
    type: 'datetime',
    labels: { format: 'HH:mm' }
  },
  yaxis: {
    tooltip: { enabled: true },
    labels: {
      formatter: (val) => '$' + val.toFixed(2)
    }
  },
  colors: ['#00e396']
})

const fetchHistoricalData = async () => {
  const url = 'https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=1&interval=minute'
  try {
    const res = await fetch(url)
    const json = await res.json()
    series.value[0].data = json.prices.map(p => ({ x: p[0], y: p[1] }))
  } catch (e) {
    console.error('Error fetching historical data:', e)
  }
}

const fetchLatestPrice = async () => {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
    const json = await res.json()
    const price = json.ethereum.usd
    const time = new Date().getTime()
    series.value[0].data.push({ x: time, y: price })
    if (series.value[0].data.length > 1440) {
      series.value[0].data.shift()
    }
  } catch (err) {
    console.error('Error fetching ETH price:', err)
  }
}

onMounted(() => {
  fetchHistoricalData()
  setInterval(fetchLatestPrice, 60000)
})
</script>

<style scoped>
.live-chart {
  max-width: 650px;
  margin: 2rem auto;
}
</style>
