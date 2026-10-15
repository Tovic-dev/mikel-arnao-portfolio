// Tracks whether the app has already rendered a page in this tab, so page-entrance
// transitions play on in-site navigation but never on a first visit (keeps LCP fast).
let appReady = false;

export function markAppReady() {
  appReady = true;
}

export function isInSiteNavigation(): boolean {
  return appReady;
}
