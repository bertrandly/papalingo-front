<script>
    import {
        getAllChallengeParticipation,
        getChallengeParticipation,
        postChallengeParticipation
    } from "$lib/quizzApi.js";
    import { onMount } from 'svelte';
    import {goto} from "$app/navigation";
    import Time from "svelte-time";
    export let challenge
    let participations = [];

    $: challengeDone = participations.length>0;

    onMount(async () => {
        participations = await getAllChallengeParticipation(challenge.id)
    });

    const startChallenge = async () => {
        let participation = await postChallengeParticipation({'challenge': challenge.id})
        goto('/challenge/' + participation.id);
    }

</script>

<li>
    <div class="timeline-middle">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-{challengeDone?'success':'secondary'}"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>
    </div>
    <div class="timeline-end timeline-box">
        <Time timestamp={challenge.startedAt} format="dddd D MMMM YYYY"></Time>
        {#if !challengeDone}
            <button on:click={startChallenge} class="btn btn-success">Start</button>
        {/if}
    </div>
    <hr/>
</li>