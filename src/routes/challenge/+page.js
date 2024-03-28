/** @type {import('../../.svelte-kit/types/src/routes').PageLoad} */

import { redirect } from '@sveltejs/kit';
import { goto } from '$app/navigation';
import {
    getAllChallengeParticipations,
} from "$lib/quizzApi.js";
/* load function must be execute only on the browser (use of goto)*/
//export const ssr = false

export async function load({params}) {
    return await getAllChallengeParticipations();
    /*const lastChallenge = await getLastChallenge();
    if (lastChallenge) {
        let participation = await postChallengeParticipation({'challenge':lastChallenge.id})
        goto('/challenge/' + participation.id);
    }*/


}