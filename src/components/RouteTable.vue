<template>
  <table>
    <tr>
      <th style="text-align: end">№</th>
      <th>Typ</th>
      <th>Name</th>
      <th>Start – Ende</th>
      <th style="text-align: end">Länge</th>
      <th style="text-align: end">Höhenmeter</th>
    </tr>

    <tr v-for="feature in features">
      <td style="text-align: end">{{ feature.properties.ROUTENNUMMER }}</td>
      <td v-if="feature.properties.ROUTEN_TYP === 'Mountainbikestrecke'">
        MTB
      </td>
      <td v-else>{{ feature.properties.ROUTEN_TYP }}</td>
      <td>
        <a :href="`/route/${feature.properties.ROUTENNUMMER}`">
          {{ feature.properties.ROUTENNAME.replace(" - ", " – ") }}
        </a>
      </td>
      <td>
        <template v-if="feature.properties.ROUTENSTART !== 'Start'">
          {{ feature.properties.ROUTENSTART }}
        </template>
        <template
          v-if="
            feature.properties.ROUTENSTART !== feature.properties.ROUTENZIEL &&
            feature.properties.ROUTENZIEL !== 'Ende' &&
            feature.properties.ROUTENZIEL !== 'Ziel'
          "
        >
          – {{ feature.properties.ROUTENZIEL }}
        </template>
      </td>
      <td style="text-align: end">
        &hoarr;{{ formatNumber(+feature.properties.LAENGE_KM, "km") }}
      </td>
      <td style="text-align: end">
        &UpTeeArrow;{{ formatNumber(+feature.properties.HM_BERGAUF, "hm") }}
        <br />
        &DownTeeArrow;{{ formatNumber(feature.properties.HM_BERGAB, "hm") }}
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { formatNumber } from "./formatters";
import { features } from "./data";
</script>
