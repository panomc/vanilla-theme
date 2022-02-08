<!-- Reset Password Modal -->
<div
  class="modal fade"
  id="{dialogID}"
  tabindex="-1"
  role="dialog"
  aria-hidden="true"
>
  <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
    <div class="modal-content bg-light">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title">Yeni Şifre Oluştur</h5>
        <button type="button" class="close text-white" data-dismiss="modal">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body pb-1">
        <form>
          <div class="form-group text-center">
            <i class="fas fa-key fa-4x text-primary d-block m-auto"></i>
          </div>
          <div class="form-group">
            <div
              class="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              <button type="button" class="close" data-dismiss="alert">
                <span aria-hidden="true">&times;</span>
              </button>
              <strong>Hata:</strong>
              Bu bir hata mesajı.
            </div>
          </div>
          <div class="form-group">
            <label for="newPassword">* Yeni Şifre:</label>
            <input type="password" id="newPassword" class="form-control" />
          </div>
          <div class="form-group">
            <label for="newPasswordRepeat">* Yeni Şifre Tekrarı:</label>
            <input
              type="password"
              id="newPasswordRepeat"
              class="form-control"
            />
          </div>
          <div class="form-group text-center">
            <button
              type="submit"
              class="btn btn-primary text-white shadow btn-lg btn-block"
              data-dismiss="modal"
            >
              Şifremi Değiştir
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<script context="module">
  import { get, writable } from "svelte/store";

  const dialogID = "resetPasswordModal";
  const error = writable({});

  let callback = () => {};
  let hideCallback = () => {};
  let modal;

  export function show() {
    error.set({});

    modal = new window.bootstrap.Modal(document.getElementById( dialogID), {backdrop: "static", keyboard: false});
    modal.show();
  }

  export function hide() {
    hideCallback();

    modal.hide();
  }

  export function setCallback(newCallback) {
    callback = newCallback;
  }

  export function onHide(newCallback) {
    hideCallback = newCallback;
  }
</script>

<script>
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
