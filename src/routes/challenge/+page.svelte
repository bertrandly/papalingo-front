<script>

    import ChallengeTimelineSummary from "../../components/ChallengeTimelineSummary.svelte";
    import {onMount} from "svelte";
    import {getNextChallenge, postChallengeParticipation} from "$lib/quizzApi.js";
    import {goto} from "$app/navigation";
    import Loader from "../../components/Loader.svelte";

    /** @type {import('../../../../.svelte-kit/types/src/routes').PageData} */
    export let data;

    let nextChallenge=null

    onMount(async () => {
        //midnight
        let now = new Date()
        now.setHours(0,0,0);
        //load challenge if last challenge was before midnight
        if(data.challenge_participations[0].startedAt<now.toISOString()){
            nextChallenge = await getNextChallenge()
        }else{
            nextChallenge = true
        }

    });
    const startChallenge = async () => {
        let participation = await postChallengeParticipation({'challenge': nextChallenge.id})
        goto('/challenge/' + participation.id);
    }
</script>

<div class="flex justify-center mt-3">
    <div class="w-1/3 text-center">
    <!--chargement-->
    {#if nextChallenge}
        <!--chargé: mais il y a t il un objet -->
        {#if nextChallenge !== true}
            {#if nextChallenge.title}
                <div class="">
                    <p><small>Today's challenge is:</small></p>
                    <h3>"{nextChallenge.title}"</h3>
                </div>
            {/if}
            <button on:click={startChallenge} class="btn btn-success btn-block ">Start</button>
        {:else}
            Job's done!
        {/if}
    {:else}
        <Loader/>
    {/if}
    </div>
</div>

<ul class="timeline timeline-vertical mt-2">

    {#each data.challenge_participations as challenge_participation}
        <ChallengeTimelineSummary challenge_participation={challenge_participation}/>
    {/each}
</ul>