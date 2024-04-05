/** @type {import('../../.svelte-kit/types/src/routes').PageLoad} */

import {
    getAllChallengeParticipations,
} from "$lib/quizzApi.js";
/* load function must be execute only on the browser (use of goto)*/
//export const ssr = false

export function load({params}) {
    //return getAllChallengeParticipations();
}