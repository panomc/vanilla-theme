<Sidebar>
  <OnlineAdmins onlineAdmins="{$data.onlineAdmins}" />
</Sidebar>

<script context="module">
  import ApiUtil from "$lib/api.util.js";
  import { writable } from "svelte/store";

  const data = writable({
    onlineAdmins: []
  });

  export const load = async (event) => {
    data.set(
      await ApiUtil.get({
        path: "/api/sidebar/support",
        request: event,
      })
    );
  };
</script>

<script>
  import Sidebar from "$lib/component/Sidebar.svelte";

  import OnlineAdmins from "$lib/component/OnlineAdmins.svelte";
</script>
