<script setup lang="ts">
import { onMounted, ref } from 'vue'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import L from 'leaflet'
import 'leaflet.markercluster'
import type { DummyDataService } from '../services/DummyDataService'

const map = ref(null)
const markerClusterGroup = ref(null)

function initMap(dataService: DummyDataService) {
  if (map.value) {
    map.value.remove()
  }
  
  map.value = L.map('map').setView([51.505, 10], 4)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map.value)

  if (markerClusterGroup.value) {
    markerClusterGroup.value.clearLayers()
  }
  markerClusterGroup.value = L.markerClusterGroup()

  const dataCenters = dataService.getDataCenters()
  dataCenters.forEach(dc => {
    const marker = L.marker([dc.position.latitude, dc.position.longitude])
      .bindPopup(`
        <strong>${dc.name}</strong><br>
        ${dc.description}
      `)
    markerClusterGroup.value.addLayer(marker)
  })

  map.value.addLayer(markerClusterGroup.value)
}

defineExpose({
  initMap
})
</script>

<template>
  <div class="map-container">
    <div id="map"></div>
  </div>
</template>

<style scoped>
.map-container {
  width: 80vw;
  height: 80vh;
  background-color: white;
}

#map {
  width: 100%;
  height: 100%;
}
</style> 