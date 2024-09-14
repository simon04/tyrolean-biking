import collection from "../../geojson/Radrouten_Tirol.geojson.json";
import type { GetStaticPaths } from "astro";

export const features = (
  collection as GeoJSON.FeatureCollection<GeoJSON.Geometry, RouteProperties>
).features
  .filter((f) => f.properties.ROUTENSEKTION_TYP !== "Variante")
  .sort((f1, f2) =>
    f1.properties.ROUTENNUMMER.padStart(10, "0").localeCompare(
      f2.properties.ROUTENNUMMER.padStart(10, "0"),
    ),
  );

export const getStaticPaths = (() =>
  features.map((feature) => ({
    params: { number: feature.properties.ROUTENNUMMER },
    props: { name: feature.properties.ROUTENNAME },
  }))) satisfies GetStaticPaths;

export const findRoute = (number: string) =>
  features.find((f) => f.properties.ROUTENNUMMER === number);

export interface RouteProperties {
  OBJECTID: number;
  OBJEKT: string;
  ROUTEN_TYP: string;
  ROUTENNUMMER: string;
  ROUTENNAME: string;
  ROUTENSTART: string;
  ROUTENZIEL: string;
  HOEHE_START: number;
  HOEHE_ZIEL: number;
  HM_BERGAUF: number;
  HM_BERGAB: number;
  FAHRZEIT: string;
  ROUTENBESCHREIBUNG: string;
  STATUS: string;
  UPDATETIMESTAMP: string;
  ROUTEN_SCHWIERIGKEIT: string;
  ROUTENSEKTION_TYP: string;
  ROUTENSTART_EN: string;
  ROUTENZIEL_EN: string;
  LAENGE_KM: number;
  ROUTENBESCHREIBUNG_EN: string;
}
