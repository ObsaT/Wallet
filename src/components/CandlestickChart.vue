
<template>
  <div class="chart-container">
    <h2 class="chart-title">Ethereum (Live)</h2>
    <apexchart
      width="100%"
      height="300"
      type="candlestick"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const series = ref([{ data: [] }])
const chartOptions = {
  chart: {
    id: 'eth-candle',
    toolbar: { show: false },
    animations: { enabled: true }
  },
  xaxis: {
    type: 'datetime'
  },
  yaxis: {
    tooltip: { enabled: true },
    labels: {
      formatter: (val) => '$' + val.toFixed(2)
    }
  },
  colors: ['#00e396']
}

const fetchAndUpdate = async () => {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/coins/ethereum/ohlc?vs_currency=usd&days=1')
    const json = await res.json()
    const newData = json.map(item => ({
      x: item[0],
      y: [item[1], item[2], item[3], item[4]]
    }))

    const lastData = series.value[0].data
    if (!lastData.length) {
      series.value[0].data = newData
    } else {
      const lastTimestamp = lastData[lastData.length - 1]?.x
      const newLastTimestamp = newData[newData.length - 1]?.x

      if (lastTimestamp === newLastTimestamp) {
        // Replace the last candle
        lastData[lastData.length - 1] = newData[newData.length - 1]
      } else if (newLastTimestamp > lastTimestamp) {
        // Append the new candle
        lastData.push(newData[newData.length - 1])
        if (lastData.length > 100) lastData.shift()
      }
    }
  } catch (e) {
    console.error('OHLC update error:', e)
  }
}

let intervalId
onMounted(() => {
  fetchAndUpdate()
  intervalId = setInterval(fetchAndUpdate, 60000)
})
onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<style scoped>
.chart-container {
  margin: 2rem auto;
  max-width: 750px;
  background: var(--bg-panel);
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 0 12px rgba(0,0,0,0.1);
}
.chart-title {
  margin-bottom: 1rem;
  font-size: 1.4rem;
  color: var(--text);
}
</style>
