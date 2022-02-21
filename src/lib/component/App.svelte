<style lang="scss" global>
  @import "../../styles/style.scss";
</style>

<slot/>

<script>
  import { browser } from "$app/env";

  if (browser) {
    import("$lib/init.libs");
  }
</script>