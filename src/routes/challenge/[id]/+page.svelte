<script>
    import Challenge from "../../../components/Challenge.svelte";

    /** @type {import('../../../../.svelte-kit/types/src/routes').PageData} */
    export let data;
</script>

<Challenge challenge={data}></Challenge>