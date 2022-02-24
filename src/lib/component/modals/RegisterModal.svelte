<!-- Register Modal -->
<div class="modal fade" id="{dialogID}" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-sm modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Kayıt Ol</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"
        ></button>
      </div>
      <form on:submit|preventDefault="{onSubmit}">
        <div class="modal-body">
          <div class="mb-3">
            <SuccessAlert
              alertElement="{successAlertElement}"
              message="{successMessage}" />
            <ErrorAlert
              alertElement="{errorAlertElement}"
              error="{errorMessage}" />
          </div>
          <div class="mb-3">
            <label for="registerUserName">Oyuncu Adı</label>
            <input
              type="text"
              id="registerUserName"
              class="form-control"
              bind:value="{$data.username}" />
          </div>
          <div class="mb-3">
            <label for="registerEmail">E-Posta</label>
            <input
              type="email"
              id="registerEmail"
              class="form-control"
              bind:value="{$data.email}" />
          </div>
          <div class="mb-3">
            <label for="registerPassword">Şifre</label>
            <input
              type="password"
              id="registerPassword"
              class="form-control"
              bind:value="{$data.password}" />
          </div>
          <div class="mb-3">
            <label for="registerPasswordRepeat">Şifre Tekrarı</label>
            <input
              type="password"
              id="registerPasswordRepeat"
              class="form-control"
              bind:value="{$data.passwordRepeat}" />
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="registerAcceptTerms"
                bind:checked="{$data.agreement}" />
              <label class="form-check-label" for="registerAcceptTerms">
                <a href="javascript:void(0);">Sunucu Kurallarını</a>
                okudum ve kabul ediyorum.
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="submit"
            class="btn btn-primary w-100"
            class:disabled="{loading}"
            disabled="{loading}">
            Kayıt Ol
          </button>
          <a
            href="javascript:void(0);"
            class="btn btn-link w-100"
            on:click="{() => {
              hide();
              showLoginModal();
            }}">
            Zaten kayıtlıysan Giriş Yap
          </a>
        </div>
      </form>
    </div>
  </div>
</div>

<script context="module">
  const dialogID = "registerModal";

  let callback = () => {};
  let hideCallback = () => {};
  let modal;

  export function show() {
    modal = new window.bootstrap.Modal(document.getElementById(dialogID), {
      backdrop: "static",
      keyboard: false,
    });
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
  import { writable, get } from "svelte/store";

  import ApiUtil, { NETWORK_ERROR } from "$lib/api.util";

  import { show as showLoginModal } from "./LoginModal.svelte";

  import ErrorAlert, {
    show as showError,
    hide as hideError,
  } from "$lib/component/ErrorAlert.svelte";
  import SuccessAlert, {
    show as showSuccess,
    hide as hideSuccess,
  } from "$lib/component/SuccessAlert.svelte";

  let loading = false;

  const dataDefault = {
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
    agreement: false,
    recaptcha: "",
  };

  const successMessage = writable("");
  const errorMessage = writable("");
  const errorAlertElement = writable(null);
  const successAlertElement = writable(null);
  const data = writable({ ...dataDefault });

  async function onSubmit() {
    hideError(get(errorAlertElement));
    hideSuccess(get(successAlertElement));

    loading = true;

    await ApiUtil.post({ path: "/auth/register", body: get(data) })
      .then((body) => {
        loading = false;

        if (body.result === "ok") {
          successMessage.set("REGISTER_SUCCESSFUL");

          showSuccess(get(successAlertElement));

          callback(get(data));

          data.set({ ...dataDefault });
        } else {
          errorMessage.set(
            body.result === "error" ? body.error : NETWORK_ERROR
          );

          showError(get(errorAlertElement));
        }
      })
      .catch(() => {
        loading = false;

        errorMessage.set(NETWORK_ERROR);

        showError(get(errorAlertElement));
      });
  }
</script>
