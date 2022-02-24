import { get, writable } from "svelte/store";
import { session } from "$app/stores";

import ApiUtil from "$lib/api.util";

export const sidebar = writable(null);
export const keepSidebar = writable(false);

export async function logout(CSRFToken) {
  await ApiUtil.post({
    path: "/auth/logout",
    CSRFToken,
  }).then(() => {
    session.update((data) => {
      data.user = null;
      data.CSRFToken = null;

      return data;
    });
  });
}

export function setSidebar(component) {
  if (get(sidebar) === component) {
    keepSidebar.set(true);
  } else {
    keepSidebar.set(true);

    sidebar.set(component);
  }
}
