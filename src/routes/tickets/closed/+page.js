import { load as loadTickets, PageTypes } from "$lib/pages/Tickets.svelte";

/**
 * @type {import('@sveltejs/kit').PageLoad}
 */
export async function load(event) {
  return loadTickets(event, PageTypes.CLOSED);
}
