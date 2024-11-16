<script setup lang="ts">
import DataCenterMap from './components/DataCenterMap.vue'
import { DummyDataService } from './services/DummyDataService'
import { ref, onMounted } from 'vue'

const mapComponent = ref(null)
const dummyService = new DummyDataService()

onMounted(() => {
  mapComponent.value?.initMap(dummyService)
})

const handleRefresh = () => {
  mapComponent.value?.initMap(dummyService)
}
</script>

<template>
  <div class="app-container">
    <div class="button-container">
      <button @click="handleRefresh" class="refresh-button">Refresh Map</button>
    </div>
    <DataCenterMap ref="mapComponent" />
  </div>
</template>

<style>
/* Global styles */
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
  background-color: white;
}
</style>

<style scoped>
.app-container {
  width: 100vw;
  max-width: 1200px;
  margin: 0;
  padding: 0;
}

.button-container {
  margin: 0 auto;
  padding: 0 10px;
}

.refresh-button {
  margin: 10px 0;
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.refresh-button:hover {
  background-color: #45a049;
}
</style>
