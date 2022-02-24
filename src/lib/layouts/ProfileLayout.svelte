<MainLayout sidebar="{sidebar}">
  <!-- Profile Page -->

  <!-- Profile Card -->
  <div class="card mb-3">
    <div class="card-body">
      <slot />
    </div>
  </div>
</MainLayout>

<script context="module">
  export function load({ session: { user } }) {
    if (!user) {
      return {
        status: 302,
        redirect: "/",
      };
    }

    return { props: { props: {  } } };
  }
</script>

<script>
  import MainLayout from "$lib/layouts/MainLayout.svelte";
  import ProfileSidebar from "$lib/component/sidebars/ProfileSidebar.svelte";
  
  export let sidebar = ProfileSidebar;
</script>
