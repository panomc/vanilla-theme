<!-- Login Modal -->
<div class="modal fade" id="{dialogID}" aria-hidden="true">
  <div class="modal-dialog modal-sm modal-dialog-centered" role="dialog">
    <div class="modal-content bg-light">
      <div class="modal-header border-bottom-0 text-black">
        <h4 class="modal-title">Giriş Yap</h4>
        <button type="button" class="close" data-dismiss="modal">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form on:submit|preventDefault="{onSubmit}">
          <div class="form-group">
            <ErrorAlert alertElement="{errorAlertElement}" error="{error}" />
          </div>
          <div class="form-group">
            <label for="usernameOrEmail">Oyuncu Adı / E-Posta</label>
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
              class="btn btn-primary text-white btn-lg btn-block"
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
  import ApiUtil, { NETWORK_ERROR } from "$lib/api.util";

  import { session } from "$app/stores";

  import { show as showForgottenPasswordModal } from "./ForgottenPasswordModal.svelte";
  import ErrorAlert, { show as showError } from "../ErrorAlert.svelte";

  let loading = false;

  async function onSubmit() {
    hideError();

    loading = true;

    await ApiUtil.post({ path: "/auth/login", body: get(data) })
      .then(async (body) => {
        if (body.result === "ok") {
          const CSRFToken = body.CSRFToken;

          await ApiUtil.get({
            path: "/api/auth/credentials",
            CSRFToken,
          }).then((body) => {
            $session.user = {
              ...Object.keys(body)
                .filter((key) => !["result"].includes(key))
                .reduce((object, key) => {
                  object[key] = body[key];

                  return object;
                }, {}),
            };

            $session.CSRFToken = CSRFToken;

            loading = false;

            hide();

            callback(get(data));
          });
        } else {
          loading = false;

          error.set(body.result === "error" ? body.error : NETWORK_ERROR);

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
