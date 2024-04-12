<script>

    import Answer from "./Answer.svelte";
    import {createEventDispatcher} from 'svelte'
    import QuestionError from "./QuestionError.svelte";
    import QuestionSuccess from "./QuestionSuccess.svelte";
    import {postAnswer} from "$lib/quizzApi.js";
    import AnswerTraduction from "./AnswerTraduction.svelte";
    import QuestionExplaination from "./QuestionExplaination.svelte";
    import QuestionHelp from "./QuestionHelp.svelte";

    const dispatch = createEventDispatcher()

    export let question
    export let participation
    export let iteration

    export let relatedToMedia = false

    let selectedAnswer = [];
    let validated = false;
    let userAnswer = null;
    $: isAnswerCorrect = false

    const onSubmit = async () => {
        console.log('submit')
        validated = true;

        isAnswerCorrect = isAnsweredCorrectly();
        userAnswer = postAnswer({
            question: question.id,
            answer: selectedAnswer.toString(),
            challengeParticipation: participation.id,
            iteration: iteration
        }).then(x => {
            console.log('postAnswer ended')
            userAnswer = x;
            isAnswerCorrect = userAnswer.correct
            dispatch('userAnswer', userAnswer)
        });

        dispatch('validation')
    }

    const isAnsweredCorrectly = () => {
        //return selectedAnswer.toString() != '' && question.correctAnswer.includes(selectedAnswer)
        if (selectedAnswer.toString() == '') {
            return false;
        } else {
            if (question.type == 'mcq') {
                selectedAnswer.sort()
                question.correctAnswers.sort()

                return selectedAnswer.toString() != '' && (question.correctAnswers.includes(selectedAnswer.toString()) || question.correctAnswers.toString() == selectedAnswer.toString())
            } else if (question.type == 'simpl') {
                return selectedAnswer.toString() == question.correctAnswer
            } else if (question.type == 'trad') {
                return selectedAnswer == question.correctAnswer
            } else {
                console.warn('unknown question type')
                return false;
            }
        }

    }

</script>


<form
        on:submit|preventDefault={onSubmit}
>
    <div class="my-3 text-center">
        <p class="mb-2">
            {#if relatedToMedia}
                Listen carefully and answer the questions
            {:else}
                {#if question.type == 'simpl'}
                    Type the missing word in the sentance below:
                {:else if question.type == 'trad'}
                    Translate the sentance below:
                {:else if question.type == 'mcq'}
                    Listen and answer the questions:
                {:else}
                    Find the missing word(s) in the sentance below:
                {/if}
            {/if}
        </p>

        <blockquote class="p-4 my-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
            <p class="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">
                "{ question.title }"
            </p>
        </blockquote>
    </div>


    {#if question.type == 'simpl'}
        <div class="flex justify-center my-5">
            <input
                    type="text"
                    placeholder="answer"
                    class="w-5/6 input input-bordered { validated?(isAnswerCorrect?'input-success':'input-error'):''} w-full max-w-xs"
                    bind:value={selectedAnswer}/>
        </div>
    {:else if question.type == 'trad'}
        <AnswerTraduction
                sentance={question.correctAnswer}
                otherWords={question.randomAnswers}
                bind:sentanceCreated={selectedAnswer}
        />
    {:else}
        <div class="my-3 grid grid-cols-2 gap-4">
            {#each question.randomAnswers as answer, answerIndex}
                <Answer
                        isCorrect={question.correctAnswers.includes(answer)}
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
        <div>
        {#if isAnswerCorrect}
            <QuestionSuccess userAnswer={userAnswer}></QuestionSuccess>
        {:else}
            <QuestionError answer={question.correctAnswer} userAnswer={userAnswer}/>
        {/if}

        {#if question.explaination}
            <QuestionExplaination question={question}/>
        {/if}
            <QuestionHelp userAnswer={userAnswer}/>
        </div>

    </div>
{/if}


