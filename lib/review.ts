// Review switch (07 §9): `?motion=on` plays the motion even when the OS asks for
// reduced motion (e.g. Windows "Animation effects" off); `?motion=off` clears it.
// Stored for the browser session only. Never on by default.

export function motionForced(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const param = new URLSearchParams(window.location.search).get("motion");
    if (param === "on") sessionStorage.setItem("motion", "on");
    if (param === "off") sessionStorage.removeItem("motion");
    return sessionStorage.getItem("motion") === "on";
  } catch {
    return false;
  }
}
