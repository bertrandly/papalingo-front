<script>
    import {patchAnswer} from "$lib/quizzApi.js";
    import Loader from "./Loader.svelte";

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
        <hr class="my-5">
        <!--<button class="btn btn-circle btn-outline" on:click={toggleForm}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25c.09-.656.54-1.134 1.342-1.134c.686 0 1.314.343 1.314 1.168c0 .635-.374.927-.965 1.371c-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486c.609-.463 1.244-.977 1.244-2.056c0-1.511-1.276-2.241-2.673-2.241c-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927c.609 0 1.028-.394 1.028-.927c0-.552-.42-.94-1.029-.94c-.584 0-1.009.388-1.009.94"/></svg>
        </button>-->
        <button class="btn btn-ghost" on:click={toggleForm}>But why ?</button>
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