<script>
    import {fetchEntity} from "$lib/quizzApi.js";
    import MediaSound from "./MediaSound.svelte";

    export let mediaId

    let mediaPromise = fetchEntity(mediaId)

</script>

{#await mediaPromise}
    <div class="skeleton w-32 h-32"></div>
{:then media}
    {#if media.type === "sound"}
       <MediaSound media="{media}"/>
    {:else}
        <img class="rounded" src={media.filePath} alt={media.title}/>
    {/if}

{/await}