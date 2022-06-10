import { get, writable } from "svelte/store";
import { session } from "$app/stores";

import { sendLogout } from "$lib/services/auth.js";

export const sidebar = writable(null);
export const queuedSidebar = writable(null);
export const queuedSidebarProps = writable(null);
export const sidebarProps = writable({});
export const keepSidebar = writable(false);
export const sidebarPageInit = writable(false);

export async function logout(CSRFToken) {
  sendLogout(CSRFToken).then(() => {
    session.update((data) => {
      data.user = null;
      data.CSRFToken = null;

      return data;
    });
  });
}

export function setSidebar(component, props = {}) {
  if (
    get(sidebar) === component &&
    component !== null &&
    get(sidebar) !== null
  ) {
    keepSidebar.set(true);
  } else {
    keepSidebar.set(true);

    queuedSidebar.set(component);
    queuedSidebarProps.set(props);

    if (get(sidebarPageInit)) {
      processQueuedSidebar();
      sidebarPageInit.set(false);
    }
  }
}

export function processQueuedSidebar() {
  sidebar.set(get(queuedSidebar));
  sidebarProps.set(get(queuedSidebarProps));
}
