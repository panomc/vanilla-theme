import { get, writable } from "svelte/store";
import { session } from "$app/stores";

import { sendLogout } from "$lib/services/auth.js";

export const sidebar = writable(null);
export const sidebarProps = writable({});
export const keepSidebar = writable(false);

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
  if (get(sidebar) === component) {
    keepSidebar.set(true);
  } else {
    keepSidebar.set(true);

    sidebar.set(component);
    sidebarProps.set(props);
  }
}
