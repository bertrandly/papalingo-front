<script>
    import Challenge from "../../../components/challenge/Challenge.svelte";
    import Loader from "../../../components/Loader.svelte";
    import {getChallengeParticipation} from "$lib/quizzApi.js";

    /** @type {import('./$types').PageData} */
    export let data;
    let cp = getChallengeParticipation(data.cp_id)

</script>

{#await cp}
    <Loader text="Loading challenge"/>
{:then loadedChallenge }
    <Challenge challengeParticipation={loadedChallenge}></Challenge>
{/await}