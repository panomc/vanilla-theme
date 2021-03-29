<script context="module">
  import jquery from "jquery";
  import { get, writable } from "svelte/store";

  const dialogID = "loginModal";
  const error = writable({});

  let callback = () => {};
  let hideCallback = () => {};

  export function show() {
    error.set({});

    jquery("#" + dialogID).modal();
  }

  export function hide() {
    hideCallback();

    jquery("#" + dialogID).modal("hide");
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

<!-- Login Modal -->
<div
  class="modal fade"
  id="{dialogID}"
  tabindex="-1"
  role="dialog"
  aria-hidden="true">
  <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
    <div class="modal-content bg-light border-lg">
      <div class="modal-header bg-primary text-white rounded-0">
        <h5 class="modal-title">Giriş Yap</h5>
        <button type="button" class="close text-white" data-dismiss="modal">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body pb-1">
        <form on:submit|preventDefault="{onSubmit}">
          <div class="form-group">
            <img
              src="/assets/img/logo.png"
              alt="Server Logo"
              class="img-fluid p-3" />
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
          </div>
          <div class="form-group">
            <label for="loginUserName">Kullanıcı Adı:</label>
            <input type="text" id="loginUserName" class="form-control" />
          </div>
          <div class="form-group">
            <label for="loginPassword">Şifre:</label>
            <input type="password" id="loginPassword" class="form-control" />
          </div>
          <div class="form-group">
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                id="rememberMe" />
              <label class="custom-control-label" for="rememberMe">
                Beni Hatırla
              </label>
            </div>
          </div>
          <div class="form-group text-center">
            <button
              type="submit"
              class="btn btn-primary text-white shadow btn-lg btn-block"
              class:disabled="{loading}"
              disabled="{loading}">
              Giriş Yap
            </button>
            <a
              href="#"
              data-toggle="modal"
              data-target="#forgettenPasswordModal"
              data-dismiss="modal">
              <button type="button" class="btn btn-link btn-block">
                Şifreni mi unuttun?
              </button>
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
