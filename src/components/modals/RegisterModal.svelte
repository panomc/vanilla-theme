<!-- Register Modal -->
<div class="modal fade" id="{dialogID}" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-sm modal-dialog-centered">
    <div class="modal-content bg-light">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title">Kayıt Ol</h5>
        <button type="button" class="close text-white" data-dismiss="modal">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
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
            <label for="registerUserName">* Kullanıcı Adı:</label>
            <input type="text" id="registerUserName" class="form-control" />
          </div>
          <div class="form-group">
            <label for="registerPassword">* Şifre:</label>
            <input type="password" id="registerPassword" class="form-control" />
          </div>
          <div class="form-group">
            <label for="registerPasswordRepeat">* Şifre Tekrarı:</label>
            <input
              type="password"
              id="registerPasswordRepeat"
              class="form-control" />
          </div>
          <div class="form-group">
            <label for="registerEmail">* E-Posta:</label>
            <input type="email" id="registerEmail" class="form-control" />
          </div>
          <div class="form-group">
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                id="registerAcceptTerms" />
              <label class="custom-control-label" for="registerAcceptTerms">
                <a href="#">Sunucu Kurallarını</a>
                okudum ve kabul ediyorum.
              </label>
            </div>
          </div>
          <div class="form-group text-center">
            <button
              type="submit"
              class="btn btn-primary text-white shadow btn-lg btn-block">
              Kayıt Ol
            </button>
            <button
              type="button"
              class="btn btn-link btn-block"
              data-dismiss="modal"
              data-toggle="modal"
              data-target="#loginModal">
              Zaten kayıtlıysan Giriş Yap
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<script context="module">
  import { get, writable } from "svelte/store";

  const dialogID = "registerModal";
  const error = writable({});

  let callback = () => {};
  let hideCallback = () => {};

  export function show() {
    error.set({});

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
