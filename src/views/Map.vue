<script setup>
	import { ref, onMounted } from "vue";
	import mapboxgl from "mapbox-gl";
	const mapContainer = ref(null);

	onMounted(() => {
		mapboxgl.accessToken =
			"pk.eyJ1IjoiY2hyaXMxOTk4IiwiYSI6ImNsZThubnM3dTAwbHUzeG82ZWNsMjBlNG8ifQ.H69DRrkZ-iYfXMAjuih4AA";
		const map = new mapboxgl.Map({
			container: "mapContainer", // container ID
			style: "mapbox://styles/mapbox/streets-v12", // style URL
			center: [121.713136, 25.097063], // starting position [lng, lat]
			zoom: 9, // starting zoom
		});
		map.on("load", () => {});
	});
</script>
<template>
	<div
		class="h-screen w-screen"
		id="mapContainer"
		ref="mapContainer"></div>
</template>

<style></style>
