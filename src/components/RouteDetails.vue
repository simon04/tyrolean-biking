<template>
  <h2>{{ feature.properties.ROUTENNAME }}</h2>

  <p>{{ feature.properties.ROUTENBESCHREIBUNG }}</p>

  <table>
    <tr>
      <th>№</th>
      <td>{{ feature.properties.ROUTENNUMMER }}</td>
    </tr>
    <tr>
      <th>Typ</th>
      <td>{{ feature.properties.ROUTEN_TYP }}</td>
    </tr>
    <tr>
      <th>Start</th>
      <td>
        {{ feature.properties.ROUTENSTART }}
        ({{ formatNumber(+feature.properties.HOEHE_START, "m ü. A.") }})
      </td>
    </tr>
    <tr>
      <th>Ende</th>
      <td>
        {{ feature.properties.ROUTENZIEL }}
        ({{ formatNumber(+feature.properties.HOEHE_ZIEL, "m ü. A.") }})
      </td>
    </tr>
    <tr>
      <th>Länge</th>
      <td>&hoarr;{{ formatNumber(+feature.properties.LAENGE_KM, "km") }}</td>
    </tr>
    <tr>
      <th>Höhenmeter</th>
      <td>
        &UpTeeArrow;{{ formatNumber(+feature.properties.HM_BERGAUF, "hm") }}
        <br />
        &DownTeeArrow;{{ formatNumber(feature.properties.HM_BERGAB, "hm") }}
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { formatNumber } from "./formatters";
import type { RouteProperties } from "./data";

defineProps<{
  feature: GeoJSON.Feature<GeoJSON.Geometry, RouteProperties>;
}>();
</script>
