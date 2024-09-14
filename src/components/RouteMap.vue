<template>
  <div class="ratio ratio-16x9 mb-4">
    <div ref="mapRef" class="map" style="height: 600px" />
  </div>
</template>

<script setup lang="ts">
import {
  Control,
  GeoJSON as GeoJSONLayer,
  Map,
  TileLayer,
  type TileLayerOptions,
} from "leaflet";
import "leaflet/dist/leaflet.css";
import { onMounted, useTemplateRef } from "vue";

const props = defineProps<{
  feature: GeoJSON.Feature;
}>();

const mapRef = useTemplateRef("mapRef");

onMounted(() => {
  setupMap();
});

function setupMap() {
  const map = new Map(mapRef.value!, { attributionControl: false }).fitWorld();
  new Control.Scale({ metric: true, imperial: false }).addTo(map);
  new Control.Attribution({ prefix: false }).addTo(map);
  new Control.Layers({
    "basemap.at": basemap(),
    "basemap.at Gelände": basemap("bmapgelaende", "grau", "jpeg"),
    "basemap.at Grau": basemap("bmapgrau").addTo(map),
    "basemap.at Orthofoto": basemap("bmaporthofoto30cm", "normal", "jpeg"),
    OpenStreetMap: osm(),
  }).addTo(map);
  const layer = new GeoJSONLayer(props.feature, {
    style: { color: "#b51621" },
  }).addTo(map);
  map.fitBounds(layer.getBounds());
}

function basemap(variant = "geolandbasemap", type = "normal", format = "png") {
  return new TileLayer(
    "https://maps.wien.gv.at/basemap/{variant}/{type}/google3857/{z}/{y}/{x}.{format}",
    {
      maxZoom: 24,
      maxNativeZoom: 19,
      attribution:
        'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>',
      bounds: [
        [46.35877, 8.782379],
        [49.037872, 17.189532],
      ],
      variant,
      type,
      format,
    } as TileLayerOptions & { variant: string; type: string; format: string }
  );
}

function osm() {
  return new TileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 24,
    maxNativeZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  });
}
</script>
