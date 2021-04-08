<!-- Forgotten Password Modal -->
<div
  class="modal fade"
  id="{dialogID}"
  tabindex="-1"
  role="dialog"
  aria-hidden="true">
  <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
    <div class="modal-content bg-light">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title">Şifreni Sıfırla</h5>
        <button type="button" class="close text-white" data-dismiss="modal">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body pb-1">
        <form>
          <div class="form-group text-center">
            <i class="fas fa-envelope-square fa-4x text-primary d-block m-auto"
            ></i>
          </div>
          <div class="form-group">
            <div
              class="alert alert-danger alert-dismissible fade show"
              role="alert">
              <button type="button" class="close" data-dismiss="alert">
                <span aria-hidden="true">&times;</span>
              </button>
              <strong>Hata:</strong>
              Bu bir hata mesajı.
            </div>
            <div
              class="alert alert-success alert-dismissible fade show"
              role="alert">
              <button type="button" class="close" data-dismiss="alert">
                <span aria-hidden="true">&times;</span>
              </button>
              <strong>Başarılı:</strong>
              Bu bir başarılı durum mesajı.
            </div>
          </div>
          <div class="form-group">
            <small class="text-muted">
              Kayıt olduğun E-Posta adresine bir sıfırlama bağlantısı
              gönderilecek. Lütfen E-Posta adresini gir.
            </small>
          </div>
          <div class="form-group">
            <label for="forgettenPasswordEmail">* E-Posta:</label>
            <input
              type="email"
              id="forgettenPasswordEmail"
              class="form-control" />
          </div>
          <div class="form-group text-center">
            <button
              type="submit"
              class="btn btn-primary text-white shadow btn-lg btn-block"
              on:click="{showResetPasswordModal}">
              Sıfırlama Bağlantısı Gönder
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<script context="module">
  import { get, writable } from "svelte/store";

  const dialogID = "forgottenPasswordModal";
  const error = writable({});

  let callback = () => {};
  let hideCallback = () => {};

  export function show() {
    error.set({});

    window.$(".modal").modal("hide");
    window.$("#" + dialogID).modal();
  }

  export function hide() {
    hideCallback();

    window.$("#" + dialogID).modal("hide");
  }

  export function setCallback(newCallback) {
    callback = newCallback;
  }

  export function onHide(newCallback) {
    hideCallback = newCallback;
  }
</script>

<script>
  import { show as showResetPasswordModal } from "./ResetPasswordModal.svelte";

  let loading = false;

  function onSubmit() {
    loading = true;

    // submitLoading.set(true);
    //
    // ApiUtil.post("panel/player/set/permissionGroup", get(player))
    //   .then((response) => {
    //     if (response.data.result === "ok") {
    //       submitLoading.set(false);
    //
    //       hide();
    //
    //       callback(get(player));
    //
    //       resolve();
    //     } else if (response.data.result === "NOT_EXISTS") {
    //       refreshBrowserPage();
    //     } else if (!!response.data.error) {
    //       errors.set(response.data.error);
    //
    //       resolve();
    //     } else reject();
    //   })
    //   .catch(() => {
    //     reject();
    //   });
  }
</script>
