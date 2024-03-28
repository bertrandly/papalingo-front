<script>
    import {patchAnswer} from "$lib/quizzApi.js";

    export let userAnswer=null;
    export let answer=null;

    let formOpen=false;
    let comment='Je n\'ai pas compris la réponse';

    const toggleForm = () =>{
        formOpen = !formOpen;
    }
    const onSubmit = async () => {
        console.log('submit pas compris')
        await patchAnswer(userAnswer.id, {
            comment: comment,
        })
        /*const url = 'http://127.0.0.1:8003/api/user_answers/'+userAnswer.id;
        const res = await fetch(url, {
            method: 'PATCH',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/merge-patch+json'
            },
            body: JSON.stringify({
                comment: comment,
            })
        })*/
        formOpen = false;
    }
</script>

<div class="card w-5/6 bg-error text-primary-content">
    <div class="card-body">
        <h2 class="card-title">Oups !</h2>

        <div class="flex ...">
            <div class="w-5/6">
                <p>The correct answer was:</p>
                <p>
                    "{answer}"
                </p>

                {#if formOpen}
                    <hr class="my-5">
                    <form on:submit|preventDefault={onSubmit}>
                        <div class="flex ...">
                            <div class="w-5/6">
                                <textarea class="textarea textarea-bordered w-full " bind:value={comment}></textarea>
                            </div>
                            <div class="w-1/6  text-right">
                                <button type="submit" class="btn btn-neutral">Envoyer</button>
                            </div>
                        </div>



                    </form>
                {/if}
            </div>
            <div class="w-1/6 text-right">
                {#if userAnswer}
                        <button class="btn btn-circle btn-outline" on:click={toggleForm}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25c.09-.656.54-1.134 1.342-1.134c.686 0 1.314.343 1.314 1.168c0 .635-.374.927-.965 1.371c-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486c.609-.463 1.244-.977 1.244-2.056c0-1.511-1.276-2.241-2.673-2.241c-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927c.609 0 1.028-.394 1.028-.927c0-.552-.42-.94-1.029-.94c-.584 0-1.009.388-1.009.94"/></svg>
                        </button>
                {/if}
            </div>
        </div>

    </div>
</div>