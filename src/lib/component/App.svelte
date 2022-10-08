<style lang="scss" global>
  @import "src/styles/style.scss";
</style>

<slot />

<script>
  import { browser } from "$app/environment";

  if (browser) {
    import("$lib/init.libs");
  }
</script>
