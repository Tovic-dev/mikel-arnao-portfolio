// Neutral stand-in images (scripts/generate-placeholders.mjs).
// Replaced project by project in Phase 8.3; launch requires none left (14 §1).
import type { ImageAsset } from "../types";

import ardura_card from "../media/_placeholder/ardura-card.jpg";
import ardura_cad from "../media/_placeholder/ardura-cad.jpg";
import ardura_figure from "../media/_placeholder/ardura-figure.jpg";
import ardura_figure_portrait from "../media/_placeholder/ardura-figure-portrait.jpg";
import ardura_figure_wide from "../media/_placeholder/ardura-figure-wide.jpg";
import ardura_hero from "../media/_placeholder/ardura-hero.jpg";
import ardura_render from "../media/_placeholder/ardura-render.jpg";
import ardura_sketch from "../media/_placeholder/ardura-sketch.jpg";
import hero_render from "../media/_placeholder/hero-render.jpg";
import mercedes_card from "../media/_placeholder/mercedes-card.jpg";
import mercedes_cad from "../media/_placeholder/mercedes-cad.jpg";
import mercedes_figure from "../media/_placeholder/mercedes-figure.jpg";
import mercedes_figure_portrait from "../media/_placeholder/mercedes-figure-portrait.jpg";
import mercedes_figure_wide from "../media/_placeholder/mercedes-figure-wide.jpg";
import mercedes_hero from "../media/_placeholder/mercedes-hero.jpg";
import mercedes_render from "../media/_placeholder/mercedes-render.jpg";
import mercedes_sketch from "../media/_placeholder/mercedes-sketch.jpg";
import orbea_card from "../media/_placeholder/orbea-card.jpg";
import orbea_cad from "../media/_placeholder/orbea-cad.jpg";
import orbea_figure from "../media/_placeholder/orbea-figure.jpg";
import orbea_figure_portrait from "../media/_placeholder/orbea-figure-portrait.jpg";
import orbea_figure_wide from "../media/_placeholder/orbea-figure-wide.jpg";
import orbea_hero from "../media/_placeholder/orbea-hero.jpg";
import orbea_render from "../media/_placeholder/orbea-render.jpg";
import orbea_sketch from "../media/_placeholder/orbea-sketch.jpg";
import portrait from "../media/_placeholder/portrait.jpg";
import seat_card from "../media/_placeholder/seat-card.jpg";
import seat_cad from "../media/_placeholder/seat-cad.jpg";
import seat_figure from "../media/_placeholder/seat-figure.jpg";
import seat_figure_portrait from "../media/_placeholder/seat-figure-portrait.jpg";
import seat_figure_wide from "../media/_placeholder/seat-figure-wide.jpg";
import seat_hero from "../media/_placeholder/seat-hero.jpg";
import seat_render from "../media/_placeholder/seat-render.jpg";
import seat_sketch from "../media/_placeholder/seat-sketch.jpg";
import bira_card from "../media/_placeholder/bira-card.jpg";
import bira_figure from "../media/_placeholder/bira-figure.jpg";
import bira_hero from "../media/_placeholder/bira-hero.jpg";
import senda_card from "../media/_placeholder/senda-norte-card.jpg";
import senda_figure from "../media/_placeholder/senda-norte-figure.jpg";
import senda_hero from "../media/_placeholder/senda-norte-hero.jpg";
import stroller_card from "../media/_placeholder/stroller-card.jpg";
import stroller_figure from "../media/_placeholder/stroller-figure.jpg";
import stroller_hero from "../media/_placeholder/stroller-hero.jpg";

const ph = (src: ImageAsset["src"], alt: string): ImageAsset => ({
  src,
  alt: `Placeholder: ${alt}`,
  placeholder: true,
});

function set(
  name: string,
  imgs: {
    card: ImageAsset["src"];
    hero: ImageAsset["src"];
    sketch: ImageAsset["src"];
    cad: ImageAsset["src"];
    render: ImageAsset["src"];
    figure: ImageAsset["src"];
    wide: ImageAsset["src"];
    portrait: ImageAsset["src"];
  },
) {
  return {
    card: ph(imgs.card, `${name} final render`),
    hero: ph(imgs.hero, `${name} hero image`),
    sketch: ph(imgs.sketch, `${name} concept sketch`),
    cad: ph(imgs.cad, `${name} CAD model`),
    render: ph(imgs.render, `${name} final render`),
    figure: ph(imgs.figure, `${name} figure`),
    wide: ph(imgs.wide, `${name} technical drawing`),
    portrait: ph(imgs.portrait, `${name} detail sketch`),
  };
}

export const placeholders = {
  homeHero: ph(hero_render, "Ardura final render"),
  portrait: ph(portrait, "portrait of Mikel Arnao"),
  ardura: set("Ardura", {
    card: ardura_card,
    hero: ardura_hero,
    sketch: ardura_sketch,
    cad: ardura_cad,
    render: ardura_render,
    figure: ardura_figure,
    wide: ardura_figure_wide,
    portrait: ardura_figure_portrait,
  }),
  seat: set("SEAT Ateca mirror", {
    card: seat_card,
    hero: seat_hero,
    sketch: seat_sketch,
    cad: seat_cad,
    render: seat_render,
    figure: seat_figure,
    wide: seat_figure_wide,
    portrait: seat_figure_portrait,
  }),
  mercedes: set("Mercedes V-Class air vent", {
    card: mercedes_card,
    hero: mercedes_hero,
    sketch: mercedes_sketch,
    cad: mercedes_cad,
    render: mercedes_render,
    figure: mercedes_figure,
    wide: mercedes_figure_wide,
    portrait: mercedes_figure_portrait,
  }),
  orbea: set("Orbea Cycle Dry rack", {
    card: orbea_card,
    hero: orbea_hero,
    sketch: orbea_sketch,
    cad: orbea_cad,
    render: orbea_render,
    figure: orbea_figure,
    wide: orbea_figure_wide,
    portrait: orbea_figure_portrait,
  }),
};

// Short entries (05 Part E).
function shortSet(
  name: string,
  imgs: {
    card: ImageAsset["src"];
    hero: ImageAsset["src"];
    figure: ImageAsset["src"];
  },
) {
  return {
    card: ph(imgs.card, `${name} main image`),
    hero: ph(imgs.hero, `${name} hero image`),
    figure: ph(imgs.figure, `${name} figure`),
  };
}

export const shortPlaceholders = {
  bira: shortSet("BIRA", {
    card: bira_card,
    hero: bira_hero,
    figure: bira_figure,
  }),
  sendaNorte: shortSet("Senda Norte", {
    card: senda_card,
    hero: senda_hero,
    figure: senda_figure,
  }),
  stroller: shortSet("Urban stroller research", {
    card: stroller_card,
    hero: stroller_hero,
    figure: stroller_figure,
  }),
};
