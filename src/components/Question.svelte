<script>

    import Answer from "./Answer.svelte";
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()

    export let question;

    let selectedAnswer=[];
    let validated=false;

    const onSubmit = () => {
        console.log('submit')
        validated=true;


        //const res = await fetch(`/api/items/1`);
        //const url ='https://swapi.dev/api/films';
        const url = 'http://127.0.0.1:8003/api/user_answers';
        const res = fetch(url, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: question.id,
                answer:  selectedAnswer.toString()
            })
        })

        dispatch('validation')
    }

    const isAnsweredCorrectly = () => {
        return selectedAnswer == question.correctAnswer;
    }


</script>


<form
        on:submit|preventDefault={onSubmit}
>
    <p>
        { question.title }
    </p>
    <fieldset>

        {#each question.randomAnswers as answer, answerIndex}
            <Answer
                    isCorrect={question.correctAnswer == answer}
                    questionValidated={validated}
                    bind:group={selectedAnswer} value={answer}
            />

        {/each}
    </fieldset>
    {#if !validated}
        <button type="submit">Valider</button>
    {/if}
</form>

{#if validated}
    <div>
        Tu as répondu { selectedAnswer }
    </div>
    <div>
        {#if isAnsweredCorrectly()}
            CORRECT
        {:else}
            FAUX
        {/if}
    </div>
{/if}


