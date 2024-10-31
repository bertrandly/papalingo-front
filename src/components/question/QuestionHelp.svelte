<script>


    //deprecated


    import {patchAnswer} from "$lib/quizzApi.js";
    import Loader from "../Loader.svelte";
    import Chapter from "../chapter/Chapter.svelte";
    import Icon from "@iconify/svelte";

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



        <div class="chat chat-start">
            <div class="chat-image avatar">
                <div class="">
                    <Icon icon="iconoir:emoji-puzzled" width="50" height="50" />
                </div>
            </div>

            <div class="chat-bubble  chat-bubble-warning">
                <button class="btn btn-ghost my-0.5" on:click={toggleForm}>But why ?</button>
            </div>

        </div>

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