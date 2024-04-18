<script>
    import {getChallengeParticipation} from "$lib/quizzApi.js";
    import {onMount} from "svelte";
    import Loader from "./Loader.svelte";
    import {xpPoints} from "../store.js";

    export let challengeParticipation;
    let challengeParticipationRefreshed = getChallengeParticipation(challengeParticipation.id)

    //update xp when cp received
    challengeParticipationRefreshed.then(function (cp) {
        xpPoints.set($xpPoints + cp.xp)
    })


</script>

<div class="flex justify-center mt-3">

    <div class="hero min-h-screen bg-base-200">
        <div class="hero-content text-center">
            <div class="max-w-md">
                <h1 class="text-5xl font-bold">Challenge Over !</h1>
                <p class="py-6">Keep practicing, that's the only way to improve. </p>
                {#await challengeParticipationRefreshed}
                    <Loader text="loading your results"/>
                {:then cp }
                    <div class="mb-8">
                        <div class="radial-progress text-primary"
                             style="--value:{cp.correctAnswerRate};"
                             role="progressbar">{cp.correctAnswerRate}%
                        </div>
                    </div>
                    <a href="/challenge" class="btn btn-outline  btn-neutral">Close</a>
                {/await}

            </div>
        </div>
    </div>


</div>

