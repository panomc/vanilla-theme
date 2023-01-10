<Sidebar>
  <!-- Play Button -->
  <div class="mb-4">
    <button
      class="btn btn-sunflower bg-gradient w-100 py-4"
      type="button"
      on:click="{onCopyCommandTextClick}"
      use:tooltip="{[
        isCommandTextCopied ? 'Kopyalandı!' : 'Kopyala',
        { placement: 'bottom', hideOnClick: false },
      ]}">
      <h4 class="text-white text-uppercase mb-0">
        {$data.ipAddress}
      </h4>
    </button>
  </div>
  <!-- Play Button End -->

  <!-- Server Status -->
  <div class="card text-center border-0 mb-4">
    <h5 class="card-header bg-danger text-white">Sunucu Durumu</h5>
    <div class="card-body">
      <div class="d-flex flex-row align-items-center justify-content-around">
        <div use:tooltip="{[$data.ipAddress, { placement: 'bottom' }]}">
          <i
            class="fas fa-lg d-block py-3"
            class:fa-xmark-circle="{!serverOnline}"
            class:text-danger="{!serverOnline}"
            class:fa-check-circle="{serverOnline}"
            class:text-mint="{serverOnline}"></i>
          {#if serverOnline}
            Çevrimiçi
          {:else}
            Çevrimdışı
          {/if}
        </div>
        <div
          use:tooltip="{[$data.mainServer ? $data.mainServer.playerCount : 0 + ' players are playing', { placement: 'bottom' }]}">
          <i class="fas fa-users fa-lg d-block text-secondary py-3"></i>
          {#if $data.mainServer}
            {$data.mainServer.playerCount}/{$data.mainServer.maxPlayerCount}
          {:else}
            0/0
          {/if}
        </div>
        <div use:tooltip="{['Game client version', { placement: 'bottom' }]}">
          <i class="fas fa-gamepad fa-lg d-block text-danger py-3"></i>
          {$data.serverGameVersion}
        </div>
      </div>
    </div>
  </div>
  <!-- Server Status End -->

  <!-- Latest Registers -->
  <div class="card text-center border-0 mb-4">
    <h5 class="card-header bg-secondary text-white">Son Kayıt Olanlar</h5>
    <div class="card-body p-0">
      <div class="row">
        {#each $data.lastRegisteredUsers as player, index (player)}
          <div class="col-3">
            <a href="/player/{player}">
              <img
                alt="{player}"
                class="rounded m-2"
                src="https://crafthead.net/avatar/{player}"
                use:tooltip="{[player, { placement: 'bottom' }]}"
                width="24" />
            </a>
          </div>
        {/each}
      </div>
    </div>
  </div>
  <!-- Latest Registers End -->
</Sidebar>

<script context="module">
  import ApiUtil from "$lib/api.util.js";
  import { writable } from "svelte/store";

  const data = writable({});

  export const load = async (event) => {
    data.set(
      await ApiUtil.get({
        path: "/api/sidebar/home",
        request: event,
      })
    );
  };
</script>

<script>
  import copy from "copy-to-clipboard";

  import Sidebar from "$lib/component/Sidebar.svelte";
  import tooltip from "$lib/tooltip.util";

  let copyClickIDForCommandText = 0;
  let isCommandTextCopied = false;

  $: serverOnline = $data.mainServer && $data.mainServer.status === "ONLINE";

  function onCopyCommandTextClick() {
    copyClickIDForCommandText++;

    const id = copyClickIDForCommandText;

    copy($data.ipAddress);

    isCommandTextCopied = true;

    setTimeout(function () {
      if (copyClickIDForCommandText === id) {
        isCommandTextCopied = false;
      }
    }, 1000);
  }
</script>
