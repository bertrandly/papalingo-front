<script>
    import {getMedia} from "$lib/quizzApi.js";
    import Loader from "../Loader.svelte";
    import {Howl} from 'howler';
    import MediaSound from "./MediaSound.svelte";

    export let mediaId
    let sound;

    let mediaPromise = getMedia(mediaId)

</script>

{#await mediaPromise}
    <Loader/>
{:then media}
    {#if media.type === "sound"}
       <MediaSound media="{media}"/>
    {:else}
        <img src={media.filePath} alt={media.title}/>
    {/if}

{/await}