import { session } from "$app/stores";

import ApiUtil from "$lib/api.util";

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
