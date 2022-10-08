import { load as loadTickets } from "$lib/pages/Tickets.svelte";

/**
 * @type {import('@sveltejs/kit').PageLoad}
 */
export async function load(event) {
  return loadTickets(event);
}