<script>
    import {getMedia} from "$lib/quizzApi.js";
    import Loader from "../Loader.svelte";
    import MediaSound from "./MediaSound.svelte";

    export let mediaId

    let mediaPromise = getMedia(mediaId)

</script>

{#await mediaPromise}
    <Loader/>
{:then media}
    {#if media.type === "sound"}
       <MediaSound media="{media}"/>
    {:else}
        <img class="rounded" src={media.filePath} alt={media.title}/>
    {/if}

{/await}