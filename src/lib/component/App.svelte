<style lang="scss" global>
  @import "src/styles/style.scss";
</style>

<slot/>

<script>
  import { browser } from "$app/env";

  if (browser) {
    import("$lib/init.libs");
  }
</script>