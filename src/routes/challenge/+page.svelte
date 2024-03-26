<script>

    import ChallengeTimelineSummary from "../../components/ChallengeTimelineSummary.svelte";

    /** @type {import('../../../../.svelte-kit/types/src/routes').PageData} */
    export let data;
</script>

<ul class="timeline timeline-vertical">
    {#each data.challenges as challenge}
        <ChallengeTimelineSummary challenge={challenge}/>
    {/each}
</ul>