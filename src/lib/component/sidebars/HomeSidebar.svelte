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
    <h5 class="card-header bg-bittersweet text-white">Sunucu Durumu</h5>
    <div class="card-body">
      <div class="d-flex flex-row align-items-center justify-content-around">
        <div use:tooltip="{['play.serveradress.com', { placement: 'bottom' }]}">
          <i class="fas fa-check-circle fa-lg d-block text-mint py-3"></i>
          Çevrimiçi
        </div>
        <div
          use:tooltip="{['157 players are playing', { placement: 'bottom' }]}">
          <i class="fas fa-users fa-lg d-block text-secondary py-3"></i>
          16/32
        </div>
        <div use:tooltip="{['Game client version', { placement: 'bottom' }]}">
          <i class="fas fa-gamepad fa-lg d-block text-bittersweet py-3"></i>
          1.8.x
        </div>
      </div>
    </div>
  </div>
  <!-- Server Status End -->

  <!-- Latest Registers -->
  <div class="card text-center border-0 mb-4">
    <h5 class="card-header bg-secondary text-white">Son Kayıt Olanlar</h5>
    <div class="card-body p-0">
      <table class="table table-borderless mb-0">
        <tbody>
          <tr>
            {#each $data.lastRegisteredUsers as player, index (player)}
              <td>
                <a href="/player/{player}">
                  <img
                    alt="{player}"
                    class="rounded"
                    src="https://crafthead.net/avatar/{player}"
                    use:tooltip="{[player, { placement: 'bottom' }]}"
                    width="24" />
                </a>
              </td>
            {/each}
          </tr>
        </tbody>
      </table>
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
