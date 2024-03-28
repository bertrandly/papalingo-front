<script>
    import {getChallengeParticipation} from "$lib/quizzApi.js";
    import {onMount} from "svelte";

    export let challengeParticipation

    onMount(async () => {
        challengeParticipation = await getChallengeParticipation(challengeParticipation.id)
    });

</script>

<div class="flex justify-center mt-3">

    <div class="hero min-h-screen bg-base-200">
        <div class="hero-content text-center">
            <div class="max-w-md">
                <h1 class="text-5xl font-bold">Challenge Over !</h1>
                <p class="py-6">Keep practicing, that's the only way to improve. </p>
                <div class="mb-8">
                    <div class="radial-progress text-primary" style="--value:{challengeParticipation.correctAnswerRate};" role="progressbar">{challengeParticipation.correctAnswerRate}%</div>
                </div>
                <a href="/challenge" class="btn btn-outline  btn-neutral">Close</a>
            </div>
        </div>
    </div>


</div>

