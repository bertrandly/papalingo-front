<script>

    import ChallengeTimelineSummary from "../../components/ChallengeTimelineSummary.svelte";
    import {onMount} from "svelte";
    import {getNextChallenge, postChallengeParticipation} from "$lib/quizzApi.js";
    import {goto} from "$app/navigation";

    /** @type {import('../../../../.svelte-kit/types/src/routes').PageData} */
    export let data;

    let nextChallenge=null

    onMount(async () => {
        nextChallenge = await getNextChallenge()
    });
    const startChallenge = async () => {
        let participation = await postChallengeParticipation({'challenge': nextChallenge.id})
        goto('/challenge/' + participation.id);
    }
</script>

{#if nextChallenge}
    <div class="flex justify-center mt-3">
        <button on:click={startChallenge} class="btn btn-success w-1/4">Start</button>
    </div>

{/if}
<ul class="timeline timeline-vertical mt-2">

    {#each data.challenge_participations as challenge_participation}
        {#if challenge_participation.endedAt}
        <ChallengeTimelineSummary challenge_participation={challenge_participation}/>
        {/if}
    {/each}
</ul>