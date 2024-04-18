<script>

    import ChallengeTimelineSummary from "../../components/challenge/ChallengeTimelineSummary.svelte";
    import {onMount} from "svelte";
    import {getAllChallengeParticipations, getNextChallenge, postChallengeParticipation} from "$lib/quizzApi.js";
    import {goto} from "$app/navigation";
    import Loader from "../../components/Loader.svelte";
    import Icon from "@iconify/svelte";


    let data = getAllChallengeParticipations();


    let nextChallenge = null  //promise
    $: participation = null

    onMount(async () => {

        nextChallenge = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("");
            }, 30000);
        });

        data.then(async function (value) {

            nextChallenge = await getNextChallenge()
            /*
            //midnight
            let now = new Date()
            now.setHours(0, 0, 0);
            if (value.length === 0 || value[0].startedAt < now.toISOString()) {
                nextChallenge = await getNextChallenge()
            } else {
                nextChallenge = await getNextChallenge()
                //nextChallenge = new Promise((resolve, reject)=>  {resolve(null)});
            }
            */
        })

    });
    const startChallenge = async (event) => {
        event.currentTarget.disabled = true;
        participation = postChallengeParticipation({'challenge': nextChallenge.id})
        participation.then(async function (value) {
            goto('/challenge/' + value.id);
        })
        return participation
    }
</script>


<div class="flex justify-center mt-3 flex-col">
    <div class="flex justify-center">
        <div class="w-1/2 text-center ">
            <!--chargement-->
            {#await data}
                <!--nothing-->
            {:then resolvedValue }
                <!--chargé: mais il y a t il un objet -->
                {#await nextChallenge}
                    <Loader text="What will be your next challenge ?"/>
                {:then loadedNexChallenge }
                    {#if loadedNexChallenge === null}
                        Job's done!
                    {:else}

                        <div class="mb-2">
                            <p><small>Today's challenge is:</small></p>
                            {#if loadedNexChallenge.isRandom}
                                <h3>A surprise! It has been generated randomly</h3>
                            {:else if loadedNexChallenge.title}
                                <h3>"{loadedNexChallenge.title}"</h3>
                            {:else}
                                <h3>Challenge #{loadedNexChallenge.id}</h3>
                            {/if}
                        </div>
                        {#if loadedNexChallenge.media}
                            <div class="flex justify-center my-4 animate-bounce">
                                <Icon icon="ri:headphone-fill" style="font-size: 44px;"/>
                            </div>
                        {/if}

                        <button on:click={startChallenge} class="btn btn-success btn-block ">
                            {#if participation === null}
                                Start
                            {:else}
                                <Loader text="Warming up"/>
                            {/if}

                        </button>
                    {/if}
                {/await}


            {/await}
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
