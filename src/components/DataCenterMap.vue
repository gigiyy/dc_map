<script setup lang="ts">
import { ref } from 'vue'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import L, { bounds } from 'leaflet'
import 'leaflet.markercluster'
import type { DummyDataService } from '../services/DummyDataService'
import type { Alert } from '../models/Alert'

const map = ref(null)
const markerClusterGroup = ref(null)
const alerts = ref<Alert[]>([])
const markers = ref(new Map())
const service = ref<DummyDataService | null>(null)

function initMap(dataService: DummyDataService) {
  if (map.value) {
    map.value.remove()
  }
  
  service.value = dataService
  alerts.value = dataService.getAlerts()
  const bounds = dataService.getBounds()
  map.value = L.map('map').fitBounds([[bounds.south, bounds.west], [bounds.north, bounds.east]])
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
    markers.value.set(dc.name, marker)
    markerClusterGroup.value.addLayer(marker)
  })

  map.value.addLayer(markerClusterGroup.value)
}

function handleAlertClick(alert: Alert) {
  // Reset all markers to default
  markers.value.forEach(marker => {
    marker.setIcon(L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    }))
  })

  const primaryDC = alert.dc
  
  // Set affected DCs to yellow (but skip the primary DC)
  if (alert.affected_dcs) {
    alert.affected_dcs.forEach(dcId => {
      if (dcId !== primaryDC) {  // Only set to yellow if not the primary DC
        const marker = markers.value.get(dcId)
        if (marker) {
          marker.setIcon(L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          }))
        }
      }
    })
  }

  // Set primary affected DC to red (do this last to ensure it's red)
  if (primaryDC) {
    const marker = markers.value.get(primaryDC)
    if (marker) {
      marker.setIcon(L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      }))
    }
  }
}


defineExpose({
  initMap,
})
</script>

<template>
  <div class="map-container">
    <div id="map"></div>
    <select multiple size="5" class="alert-select">
      <option 
        v-for="alert in alerts" 
        :key="alert.id"
        @click="handleAlertClick(alert)"
      >
        {{ alert.title }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.map-container {
  width: 95vw;
  height: 80vh;
  background-color: white;
}

#map {
  width: 100%;
  height: 100%;
}

.alert-select {
  position: absolute;
  z-index: 1000;
  top: 100px;
  right: 10px;
  width: 300px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style> 