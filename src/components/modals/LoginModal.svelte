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
            <ErrorAlert alertElement="{errorAlertElement}" error="{error}" />
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
  import { writable, get } from "svelte/store";

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
  const errorAlertElement = writable(null);

  let callback = () => {};
  let hideCallback = () => {};

  let ApiUtil, NETWORK_ERROR;

  async function initUtils() {
    if (typeof ApiUtil === "undefined") {
      const ApiUtilModule = await import("../../pano-ui/js/api.util");

      ApiUtil = ApiUtilModule.default;
      NETWORK_ERROR = ApiUtilModule.NETWORK_ERROR;
    }
  }

  export function show() {
    error.set("");

    data.set({ ...dataDefault });

    hideError(get(errorAlertElement));

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
  import { show as showForgottenPasswordModal } from "./ForgottenPasswordModal.svelte";
  import ErrorAlert, { show as showError } from "../ErrorAlert.svelte";

  import { session } from "$app/stores";

  let loading = false;

  async function updateSessionUser() {
    const user = await new Promise((resolve) => {
      ApiUtil.get("auth/credentials").then((response) => {
        if (response.data.result === "ok") {
          const notAllowed = ["result"];
          const data = Object.keys(response.data)
            .filter((key) => !notAllowed.includes(key))
            .reduce((object, key) => {
              object[key] = response.data[key];

              return object;
            }, {});

          resolve(data);
        }

        if (response.data.error === "NOT_LOGGED_IN") resolve("-");
      });
    });

    session.update((session) => {
      session.user = user;

      return session;
    });
  }

  async function onSubmit() {
    await initUtils();

    hideError();

    loading = true;

    ApiUtil.post("auth/login", get(data))
      .then((response) => {
        if (response.data.result === "ok") {
          updateSessionUser().then(() => {
            loading = false;

            hide();

            callback(get(data));
          });
        } else {
          loading = false;

          error.set(
            response.data.result === "error"
              ? response.data.error
              : NETWORK_ERROR
          );

          showError(get(errorAlertElement));
        }
      })
      .catch(() => {
        loading = false;

        error.set(NETWORK_ERROR);

        showError(get(errorAlertElement));
      });
  }
</script>
