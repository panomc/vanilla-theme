<!-- Login Modal -->
<div class="modal fade" id="{dialogID}" aria-hidden="true">
  <div class="modal-dialog modal-sm modal-dialog-centered" role="dialog">
    <div class="modal-content bg-light">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title">Giriş Yap</h5>
        <button type="button" class="close text-white" data-dismiss="modal">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form on:submit|preventDefault="{onSubmit}">
          <div class="form-group">
            <ErrorAlert />
          </div>
          <div class="form-group">
            <label for="usernameOrEmail">Kullanıcı Adı / E-Posta</label>
            <input
              type="text"
              id="usernameOrEmail"
              class="form-control"
              bind:value="{$data.usernameOrEmail}" />
          </div>
          <div class="form-group">
            <label for="password">Şifre</label>
            <input
              type="password"
              id="password"
              class="form-control"
              bind:value="{$data.password}" />
          </div>
          <div class="form-group">
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                id="rememberMe"
                bind:checked="{$data.rememberMe}" />
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
              href="javascript:void(0);"
              class="btn btn-link btn-block"
              on:click="{showForgottenPasswordModal}">
              Şifreni mi unuttun?
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<script context="module">
  import { get, writable } from "svelte/store";

  import { hide as hideError } from "../ErrorAlert.svelte";

  const dataDefault = {
    usernameOrEmail: "",
    password: "",
    rememberMe: false,
    recaptcha: "",
  };

  const dialogID = "loginModal";
  const error = writable("");
  const data = writable(dataDefault);

  let callback = () => {};
  let hideCallback = () => {};

  export function show() {
    error.set("");
    data.set(dataDefault);
    hideError();

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
  import { onMount } from "svelte";

  import { show as showForgottenPasswordModal } from "./ForgottenPasswordModal.svelte";
  import ErrorAlert, { show as showError } from "../ErrorAlert.svelte";

  let ApiUtil, NETWORK_ERROR;

  onMount(async () => {
    const ApiUtilModule = await import("../../pano-ui/js/api.util");

    ApiUtil = ApiUtilModule.default;
    NETWORK_ERROR = ApiUtilModule.NETWORK_ERROR;
  });

  let loading = false;

  function onSubmit() {
    hideError();

    loading = true;

    ApiUtil.post("auth/login", get(data))
      .then((response) => {
        loading = false;
        console.log(response.data);

        if (response.data.result === "ok") {
          hide();

          callback(get(data));

          resolve();
        } else {
          showError(
            response.data.result === "error"
              ? response.data.error
              : NETWORK_ERROR
          );
        }
      })
      .catch(() => {
        loading = false;

        showError(NETWORK_ERROR);
      });
  }
</script>
