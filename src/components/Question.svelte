<script>

    import Answer from "./Answer.svelte";
    import { createEventDispatcher } from 'svelte'
    import QuestionError from "./QuestionError.svelte";
    import QuestionSuccess from "./QuestionSuccess.svelte";
    import {postAnswer} from "$lib/quizzApi.js";
    const dispatch = createEventDispatcher()

    export let question;
    export let participation;

    let selectedAnswer=[];
    let validated=false;
    let userAnswer=null;
    $: isAnswerCorrect=false

    const onSubmit = async () => {
        console.log('submit')
        validated = true;

        isAnswerCorrect = isAnsweredCorrectly();
        userAnswer = postAnswer( {
            question: question.id,
            answer: selectedAnswer.toString(),
            challengeParticipation: participation.id
        }).then(x => {
            userAnswer=x;
            isAnswerCorrect = userAnswer.correct
        });

        dispatch('validation')
    }

    const isAnsweredCorrectly = () => {
        return selectedAnswer.toString() != '' && question.correctAnswer.includes(selectedAnswer)
    }

</script>


<form
        on:submit|preventDefault={onSubmit}
>
    <div class="my-3 text-center">
        { question.title }
    </div>


        {#if question.type == 'simpl'}
            <div class="flex justify-center my-5">
                <input type="text" placeholder="answer" class="w-5/6 input input-bordered { validated?(isAnswerCorrect?'input-success':'input-error'):''} w-full max-w-xs" bind:value={selectedAnswer}/>
            </div>
        {:else}
            <div class="my-3 grid grid-cols-2 gap-4">
                {#each question.randomAnswers as answer, answerIndex}
                    <Answer
                            isCorrect={question.correctAnswer == answer}
                            questionValidated={validated}
                            bind:group={selectedAnswer} value={answer}
                    />
                {/each}
            </div>
        {/if}


    {#if !validated}
        <button type="submit" class="btn btn-block btn-success">Validate</button>
    {/if}
</form>

{#if validated}

    <div class="flex justify-center my-5">
        {#if isAnswerCorrect}
            <QuestionSuccess></QuestionSuccess>
        {:else}
            <QuestionError answer={question.correctAnswer} userAnswer={userAnswer}/>
        {/if}
    </div>
{/if}


