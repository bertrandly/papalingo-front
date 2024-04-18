<script>
    import {patchAnswer} from "$lib/quizzApi.js";
    import Loader from "../Loader.svelte";

    export let userAnswer=null;

    let formOpen=false;
    let comment='I don\'t understand the answer';

    const toggleForm = () =>{
        formOpen = !formOpen;
    }

    let submittingComment=null;
    const onSubmit = async () => {
        console.log('submit pas compris')
        submittingComment = patchAnswer(userAnswer.id, {
            comment: comment,
        }).then(()=>(formOpen = false))

    }
</script>

<div class="">
    {#if userAnswer}
        <button class="btn btn-ghost my-0.5" on:click={toggleForm}>But why ?</button>
    {/if}
</div>
<div>
    {#if formOpen}
        {#if ! submittingComment}
            <form on:submit|preventDefault={onSubmit} class="flex flex-col">
                <textarea class="textarea textarea-bordered w-full " bind:value={comment}></textarea>
                <button type="submit" class="btn btn-neutral my-1">Send</button>
            </form>
        {:else}
            {#await submittingComment}
                <Loader text="Sending"/>
            {/await}
        {/if}
    {/if}
</div>