<!-- Register Modal -->
<div class="modal fade" id="{dialogID}" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-sm modal-dialog-centered">
    <div class="modal-content bg-light">
      <div class="modal-header border-bottom-0 text-black">
        <h4 class="modal-title">Kayıt Ol</h4>
        <button type="button" class="close" data-dismiss="modal">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form on:submit|preventDefault="{onSubmit}">
          <div class="form-group">
            <SuccessAlert
              alertElement="{successAlertElement}"
              message="{successMessage}"
            />
            <ErrorAlert
              alertElement="{errorAlertElement}"
              error="{errorMessage}"
            />
          </div>
          <div class="form-group">
            <label for="registerUserName">Oyuncu Adı</label>
            <input
              type="text"
              id="registerUserName"
              class="form-control"
              bind:value="{$data.username}"
            />
          </div>
          <div class="form-group">
            <label for="registerEmail">E-Posta</label>
            <input
              type="email"
              id="registerEmail"
              class="form-control"
              bind:value="{$data.email}"
            />
          </div>
          <div class="form-group">
            <label for="registerPassword">Şifre</label>
            <input
              type="password"
              id="registerPassword"
              class="form-control"
              bind:value="{$data.password}"
            />
          </div>
          <div class="form-group">
            <label for="registerPasswordRepeat">Şifre Tekrarı</label>
            <input
              type="password"
              id="registerPasswordRepeat"
              class="form-control"
              bind:value="{$data.passwordRepeat}"
            />
          </div>
          <div class="form-group">
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                id="registerAcceptTerms"
                bind:checked="{$data.agreement}"
              />
              <label class="custom-control-label" for="registerAcceptTerms">
                <a href="#">Sunucu Kurallarını</a>
                okudum ve kabul ediyorum.
              </label>
            </div>
          </div>
          <div class="form-group text-center">
            <button
              type="submit"
              class="btn btn-primary text-white btn-lg btn-block"
              class:disabled="{loading}"
              disabled="{loading}"
            >
              Kayıt Ol
            </button>
            <a
              href="javascript:void(0);"
              class="btn btn-link btn-block"
              on:click="{() => {
                hide();
                showLoginModal();
              }}"
            >
              Zaten kayıtlıysan Giriş Yap
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<script context="module">
  const dialogID = "registerModal";

  let callback = () => {};
  let hideCallback = () => {};

  export function show() {
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
  import { writable, get } from "svelte/store";

  import ApiUtil, { NETWORK_ERROR } from "$lib/api.util";

  import { show as showLoginModal } from "./LoginModal.svelte";

  import ErrorAlert, {
    show as showError,
    hide as hideError,
  } from "../ErrorAlert.svelte";
  import SuccessAlert, {
    show as showSuccess,
    hide as hideSuccess,
  } from "../SuccessAlert.svelte";

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

    await ApiUtil.post("auth/register", get(data))
      .then((response) => {
        loading = false;

        if (response.data.result === "ok") {
          successMessage.set("REGISTER_SUCCESSFUL");

          showSuccess(get(successAlertElement));

          callback(get(data));

          data.set({ ...dataDefault });
        } else {
          errorMessage.set(
            response.data.result === "error"
              ? response.data.error
              : NETWORK_ERROR
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
