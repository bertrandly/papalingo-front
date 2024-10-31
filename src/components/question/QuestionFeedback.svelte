<script>
    import {createUserQuestion, getUserQuestion, patchAnswer, patchUserQuestion} from "$lib/quizzApi.js";
    import Loader from "../Loader.svelte";
    import Chapter from "../chapter/Chapter.svelte";
    import Icon from "@iconify/svelte";
    import {user} from '../../store.js';
    import {onMount} from "svelte";

    export let question;

    let formOpen = false;
    let comment = '';
    let userQuestion = null;
    let submittingComment = null;

    onMount(async () => {
        if ($user) {
            getUserQuestion(question, $user).then(value => {
                userQuestion = value;
                if (value.length > 0) {
                    userQuestion = value[0];
                } else {
                    userQuestion = {
                        id: null,
                        user: $user.id,
                        question: question.id,
                        comment: '',
                        isBlackListed: false,
                    }
                }
                console.log('getUserQuestion promise resolved');
                console.log(value);
            });
        }

    })


    const toggleForm = () => {
        formOpen = !formOpen;
    }


    const onSubmit = async () => {
        console.log('submit UQ')
        if (userQuestion.id) {
            submittingComment = patchUserQuestion(userQuestion.id, userQuestion)
        } else {
            submittingComment = createUserQuestion(userQuestion)
        }
        submittingComment.then(res => {
            formOpen = false;
            submittingComment = false;
            console.log(res);
            userQuestion = res;
        })
    }
</script>


{#if userQuestion }
    <div class="chat chat-start">
        <div class="chat-image avatar">
            <div class="">
                <Icon icon="iconoir:emoji-puzzled" width="25" height="25"/>
            </div>
        </div>

        <div class="chat-bubble  chat-bubble-warning">
            <button class="btn btn-ghost my-0.5" on:click={toggleForm}>Please, I need help</button>
        </div>
    </div>
{/if}
<div>
    {#if formOpen}
        {#if !submittingComment}
            <form on:submit|preventDefault={onSubmit} class="flex flex-col my-2">
                <textarea class="textarea textarea-bordered w-full " placeholder="I don't understand the answer"
                          bind:value={userQuestion.comment}></textarea>

                <div class="form-control mt-2">
                    <label class="cursor-pointer label justify-start">

                        <input type="checkbox" class="checkbox "
                               bind:checked={userQuestion.isBlackListed}/>
                        <span class="label-text ml-2">Don't ask me this question ever again !</span>
                    </label>
                </div>

                <button type="submit" class="btn btn-neutral my-1">Send</button>
            </form>
        {:else}
            {#await submittingComment}
                <Loader text="Sending"/>
            {/await}
        {/if}
    {/if}
</div>