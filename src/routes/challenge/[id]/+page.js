import {getChallenge, getChallengeParticipation} from "$lib/quizzApi.js";

/** @type {import('../../../../.svelte-kit/types/src/routes').PageLoad} */
export async function load({params}) {
    return await getChallengeParticipation(params.id);
}