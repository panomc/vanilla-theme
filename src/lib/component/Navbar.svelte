<!-- Navbar -->
<style>
  @media (max-width: 991.98px) {
    .rounded-pill {
      border-radius: 0.3rem !important;
    }
  }
</style>

<div class="container">
  <nav
    class="navbar navbar-expand-lg navbar-dark bg-primary bg-body-primary bg-gradient rounded-pill shadow mb-3">
    <div class="container">
      <ul class="navbar-nav flex-row me-auto">
        <li class="nav-item rounded-pill">
          <a class="nav-link" href="/">
            <i class="fa-solid fa-house"></i>
          </a>
        </li>
        <button
          class="navbar-toggler d-lg-none mx-lg-0 mx-3"
          data-bs-target="#navbar"
          data-bs-toggle="collapse"
          type="button">
          <i aria-hidden="true" class="fa fa-bars"></i>
        </button>
      </ul>

      <ul class="navbar-nav flex-row ml-auto order-lg-last">
        {#if $session.user && $session.user.panelAccess}
          <li class="nav-item rounded-pill">
            <a
              class="nav-link"
              href="{PANEL_URL}"
              target="_blank"
              rel="noreferrer">
              <i
                class="fa-solid fa-arrow-up fa-rotate-by"
                style="--fa-rotate-angle: 45deg;"></i> Panel
            </a>
          </li>
        {/if}

        <!-- Notifications Dropdown -->
        <div
          class="nav-item mx-lg-0 mx-3"
          id="quickNotificationsDropdown"
          class:d-none="{!$session.user}">
          <div class="dropdown">
            <a
              href="javascript:void(0);"
              class="nav-link"
              data-bs-toggle="dropdown"
              role="button"
              title="Bildirimler">
              <i class="fas fa-bell fa-lg"></i>

              {#if $notificationsCount !== 0}
                <span
                  class="position-absolute p-2 start-75 translate-middle badge rounded-pill bg-danger">
                  {$notificationsCount}
                </span>
              {/if}
            </a>
            <div class="dropdown-menu dropdown-menu-end position-absolute">
              <h6 class="dropdown-header">
                Bildirimler {$notificationsCount === 0
                  ? ""
                  : "(" + $notificationsCount + ")"}
              </h6>

              {#if $quickNotifications.length === 0}
                <NoContent />
              {:else}
                {#each $quickNotifications as notification, index (notification)}
                  <a
                    href="javascript:void(0);"
                    on:click="{() => onNotificationClick(notification)}"
                    class="dropdown-item"
                    class:notification-unread="{notification.status ===
                      'NOT_READ'}">
                    <p class="mb-0">{notification.type}</p>
                    <small class="text-dark">
                      {getTime(checkTime, parseInt(notification.date), "")}
                    </small>
                  </a>
                {/each}
              {/if}

              <a class="dropdown-item text-center small" href="/notifications">
                Tümünü Görüntüle
              </a>
            </div>
          </div>
        </div>

        {#if $session.user}
          <!-- User Dropdown -->
          <li class="nav-item rounded-pill mr-lg-0 mr-5">
            <div class="dropdown">
              <a
                class="nav-link"
                href="javascript:void(0);"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                <img
                  alt="{$session.user.username}"
                  class="rounded"
                  src="https://crafthead.net/avatar/{$session.user.username}"
                  width="24" />
              </a>
              <div class="dropdown-menu dropdown-menu-end position-absolute">
                <h6 class="dropdown-header">{$session.user.username}</h6>
                <a class="dropdown-item" href="/profile">İstatistikler</a>
                <a class="dropdown-item" href="/profile/settings">Ayarlar</a>
                <hr class="dropdown-divider" />
                <a class="dropdown-item" href="/tickets">Talepler</a>
                <hr class="dropdown-divider" />
                <a
                  class="dropdown-item text-danger"
                  href="javascript:void(0);"
                  on:click="{logout}">Çıkış Yap</a>
              </div>
            </div>
          </li>
        {:else}
          <li class="nav-item me-xl-0 me-3">
            <button class="nav-link" on:click="{showLoginModal}">
              Giriş Yap
            </button>
          </li>
          <li class="nav-item">
            <button
              type="button"
              class="nav-link"
              on:click="{showRegisterModal}">
              Kayıt Ol
            </button>
          </li>
        {/if}
      </ul>

      <div class="collapse navbar-collapse" id="navbar">
        <ul class="navbar-nav text-lg-left text-center mr-auto mt-2 mt-lg-0">
          <li class="nav-item rounded-pill">
            <a href="/support" class="nav-link">Destek</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</div>

<!-- Navbar -->
<script>
  import { formatDistanceToNow } from "date-fns";
  import { getContext, onDestroy, onMount } from "svelte";

  import { PANEL_URL } from "$lib/variables.js";
  import { notificationsCount, quickNotifications, logout } from "$lib/Store";
  import ApiUtil from "$lib/api.util.js";
  import { onNotificationClick } from "$lib/NotificationManager.js";

  import NoContent from "$lib/component/NoContent.svelte";

  import { show as showLoginModal } from "./modals/LoginModal.svelte";
  import { show as showRegisterModal } from "./modals/RegisterModal.svelte";

  let quickNotificationProcessID = 0;

  let checkTime = 0;
  let interval;

  const session = getContext("session");

  function markQuickNotificationsAsRead(id) {
    ApiUtil.post({
      path: "/api/notifications/quick/markAsRead",
    }).then((body) => {
      if (quickNotificationProcessID === id) {
        if (body.result === "ok") {
          notificationsCount.set(body.notificationCount);
        }

        setTimeout(() => {
          if (quickNotificationProcessID === id) {
            startMarkQuickNotificationsAsReadCountDown();
          }
        }, 1000);
      }
    });
  }

  function startMarkQuickNotificationsAsReadCountDown() {
    quickNotificationProcessID++;

    const id = quickNotificationProcessID;

    if ($quickNotifications.length > 0) {
      markQuickNotificationsAsRead(id);
    } else {
      setTimeout(() => {
        if (quickNotificationProcessID === id) {
          startMarkQuickNotificationsAsReadCountDown();
        }
      }, 1000);
    }
  }

  function getTime(check, time, locale) {
    return formatDistanceToNow(time, { addSuffix: true });
  }

  onMount(() => {
    const dropdown = document.getElementById("quickNotificationsDropdown");

    dropdown.addEventListener("show.bs.dropdown", function () {
      startMarkQuickNotificationsAsReadCountDown();
    });

    dropdown.addEventListener("hide.bs.dropdown", function () {
      quickNotificationProcessID++;
    });

    interval = setInterval(() => {
      checkTime += 1;
    }, 1000);
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>
