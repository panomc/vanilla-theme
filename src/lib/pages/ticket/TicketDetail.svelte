<style global>
  .messages-section {
    overflow-y: auto;
    max-height: 450px;
  }

  .message-balloon > p {
    margin: 0;
    padding: 0;
  }
</style>

<article class="container">
  <div class="card">
    <div class="card-body">
      <div
        class="row justify-content-between mb-3 animate__animated animate__slideInUp">
        <div class="col-auto">
          <h3>Talep: {data.ticket.id}</h3>
        </div>
        <div class="col-auto ml-auto">
          {#if data.ticket.status !== TicketStatuses.CLOSED}
            <a
              class="btn btn-danger"
              role="button"
              href="javascript:void(0);"
              on:click="{() => showCloseTicketConfirmModal(data.ticket)}">
              <i class="fas fa-times me-2"></i> Talebi Kapat
            </a>
          {/if}
        </div>
      </div>

      <div class="card mb-3">
        <div
          class="card-header bg-opacity-25 pt-3"
          class:bg-secondary="{data.ticket.status === TicketStatuses.NEW}"
          class:bg-sunflower="{data.ticket.status === TicketStatuses.REPLIED}"
          class:bg-danger="{data.ticket.status === TicketStatuses.CLOSED}">
          <div class="row">
            <div class="col">
              <h5 class="card-title">{data.ticket.title}</h5>
              <small>
                <Date time="{data.ticket.date}" relativeFormat="{true}" />
                ,
                <a
                  href="/tickets/category/{data.ticket.category.url}"
                  title="Filtrele"
                  >{data.ticket.category === "-"
                    ? "Kategorisiz"
                    : data.ticket.category.title}
                </a>
                kategorisine açıldı.</small>
            </div>
            <div class="col-auto">
              <TicketStatus status="{data.ticket.status}" />
            </div>
          </div>
        </div>
        <div
          class="card-body messages-section"
          id="messageSection"
          bind:this="{messagesSectionDiv}"
          bind:clientHeight="{$messagesSectionClientHeight}">
          {#if data.ticket.messages.length < data.ticket.messageCount && data.ticket.messageCount > 5}
            <button
              class="btn btn-link bg-light d-block m-auto"
              class:disabled="{loadMoreLoading}"
              on:click="{loadMore}"
              ><i class="fas fa-arrow-up mr-1"></i> Önceki Mesajlar ({data
                .ticket.messageCount -
                (data.ticket.messages.length - sentMessageCount)})
            </button>
          {/if}

          {#each data.ticket.messages as message, index (message)}
            {#if message.panel}
              <div class="row py-2 flex-nowrap justify-content-end">
                <div class="col-auto d-flex align-items-center">
                  <!-- <a
                      class="btn btn-link btn-sm text-gray mr-2"
                      role="button"
                      href="javascript:void(0);">
                      <i class="fas fa-ellipsis-v"></i>
                    </a> -->
                  <Date time="{message.date}">
                    <div
                      class="message-balloon p-2 rounded bg-primary text-white">
                      {@html message.message}
                    </div>
                  </Date>
                </div>
                <div class="col-auto">
                  <a href="/player/{message.username}">
                    <img
                      src="https://crafthead.net/avatar/{message.username}/48"
                      alt="{message.username}"
                      class="rounded-circle d-block mr-auto animate__animated animate__zoomIn"
                      use:tooltip="{[
                        message.username,
                        { placement: 'bottom' },
                      ]}"
                      width="48"
                      height="48" />
                  </a>
                </div>
              </div>
            {:else}
              <div class="row py-2 flex-nowrap justify-content-start">
                <div class="col-auto text-right">
                  <a href="/player/{message.username}">
                    <img
                      src="https://crafthead.net/avatar/{message.username}/48"
                      alt="{message.username}"
                      class="rounded-circle animate__animated animate__zoomIn"
                      use:tooltip="{[
                        message.username,
                        { placement: 'bottom' },
                      ]}"
                      width="48"
                      height="48" />
                  </a>
                </div>
                <div class="col-auto d-flex flex-nowrap align-items-center">
                  <Date time="{message.date}">
                    <div
                      class="message-balloon p-2 rounded d-inline-block bg-light text-black">
                      {message.message}
                    </div>
                  </Date>
                  <a
                    class="btn btn-link d-none ml-3"
                    role="button"
                    href="javascript:void(0);">
                    <i class="fas fa-ellipsis-v"></i>
                  </a>
                </div>
              </div>
            {/if}
          {/each}
        </div>
      </div>

      {#if data.ticket.status === TicketStatuses.CLOSED}
        <div class="container text-center">
          <i class="fas fa-times fa-3x text-dark text-opacity-25 m-3"></i>
          <p class="text-gray">Bu talep kapalı.</p>
        </div>
      {:else}
        <div class="row align-items-end">
          <div class="col">
            <textarea
              placeholder="Mesajınız..."
              class="form-control"
              bind:value="{message}"></textarea>
          </div>
          <div class="col-auto">
            <button
              class="btn btn-secondary"
              on:click="{sendMessage}"
              class:disabled="{messageSendLoading || isSendButtonDisabled}"
              :disabled="{messageSendLoading || isSendButtonDisabled}">
              <i class="fas fa-paper-plane"></i>
              <span class="d-lg-inline d-none">Gönder</span>
            </button>
          </div>
        </div>
      {/if}
    </div>
  </div>
</article>

<script context="module">
  import TicketCreateAndDetailSidebar, {
    load as loadSidebar,
  } from "$lib/component/sidebars/TicketCreateAndDetailSidebar.svelte";
  import { setSidebar } from "$lib/Store";
  import { getTicketDetail } from "$lib/services/tickets";
  import { error } from "@sveltejs/kit";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(event) {
    const { parent } = event;
    await parent();

    let data = {
      ticket: {
        id: -1,
        username: "",
        title: "",
        category: "-",
        messages: [],
        status: 1,
        date: 0,
        messageCount: 0,
      },
    };

    await loadSidebar(event);
    setSidebar(TicketCreateAndDetailSidebar);

    await getTicketDetail({
      id: event.params.id,
      request: event,
    }).then((body) => {
      if (body.error) {
        if (body.error === "NOT_EXISTS") {
          throw error(404, body.error);
        }

        throw error(500, body.error);
      }

      data = body;
    });

    return data;
  }
</script>

<script>
  import { afterUpdate, onMount } from "svelte";
  import { writable } from "svelte/store";

  import Date from "$lib/component/Date.svelte";
  import tooltip from "$lib/tooltip.util";

  import TicketStatus, {
    TicketStatuses,
  } from "$lib/component/TicketStatus.svelte";
  import {
    loadMoreTicketMessages,
    sendTicketMessage,
  } from "$lib/services/tickets";

  import {
    show as showCloseTicketConfirmModal,
    setCallback as setCloseTicketConfirmCallback,
  } from "$lib/component/modals/CloseTicketConfirmModal.svelte";

  export let data;

  let message = "";

  let messagesSectionDiv;
  let loadMoreLoading = false;
  let messageSendLoading = false;

  let shouldScroll = true;

  let sentMessageCount = 0;

  $: isSendButtonDisabled = message === "";

  const messagesSectionClientHeight = writable(0);

  async function loadMore() {
    loadMoreLoading = true;

    await loadMoreTicketMessages({
      id: data.ticket.id,
      lastMessageId: data.ticket.messages[0].id,
    }).then((body) => {
      if (body.error) {
        return;
      }

      body.messages.reverse().forEach((message) => {
        data.ticket.messages.unshift(message);
      });

      data.ticket.messages = data.ticket.messages;

      loadMoreLoading = false;
    });
  }

  async function sendMessage() {
    messageSendLoading = true;

    await sendTicketMessage({
      ticketId: data.ticket.id,
      message,
    }).then((body) => {
      if (body.error) {
        return;
      }

      shouldScroll = true;

      data.ticket.messages.push(body.message);
      data.ticket = data.ticket;

      sentMessageCount++;

      message = "";

      messageSendLoading = false;
    });
  }

  setCloseTicketConfirmCallback(() => {
    data.ticket.status = TicketStatuses.CLOSED;
  });

  afterUpdate(() => {
    if (shouldScroll && messagesSectionDiv.scrollHeight > 0) {
      messagesSectionDiv.scrollTo(0, messagesSectionDiv.scrollHeight);

      shouldScroll = false;
    }
  });

  onMount(() => {
    shouldScroll = true;
  });
</script>
