<script>
    import ChallengeTimelineSummary from "../../components/challenge/ChallengeTimelineSummary.svelte";
    import {getAllChallengeParticipations, getNextChallenge, postChallengeParticipation} from "$lib/quizzApi.js";
    import Loader from "../../components/Loader.svelte";
    let data = getAllChallengeParticipations();
</script>


<div class="flex justify-center mt-3 flex-col">
    <div class="flex justify-center">
        <div class="w-1/2 text-center ">
            <a href="challenge/new" class="btn btn-success btn-block ">Start</a>
        </div>
    </div>

    <div class="text-center">
        <div class="mt-2">
            {#await data}
                <Loader text="What have you done so far ?"/>
            {:then resolvedValue }
                {#if resolvedValue.length > 0}
                    <ul class="timeline timeline-vertical mt-2">
                        {#each resolvedValue as challenge_participation}
                            <ChallengeTimelineSummary challenge_participation={challenge_participation}/>
                        {/each}
                    </ul>
                {:else}
                    Ready for your first day ?
                {/if}
            {/await}
        </div>
    </div>
</div>
