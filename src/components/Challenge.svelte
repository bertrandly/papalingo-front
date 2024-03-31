<script>
    import {fly} from "svelte/transition";
    import Question from "./Question.svelte";
    import {closeChallengeParticipation, getQuestion} from "$lib/quizzApi.js";
    import ChallengeFinished from "./ChallengeFinished.svelte";
    import Loader from "./Loader.svelte";

    export let challengeParticipation

    let challenge = challengeParticipation.challenge
    let questions = [];
    let currentQuestionIndex = -1;
    $: progression = challenge.questions.length>0?(currentQuestionIndex)/(challenge.questions.length)*100:0;
    $: currentQuestion = null;
    let state = 'init';
    let questionValidated=false;


    function nextQuestion() {
        questionValidated=false;
        if(currentQuestionIndex>=0 && (currentQuestionIndex+1) === challenge.questions.length){
            state = 'ended'
            currentQuestionIndex++;
            closeChallengeParticipation(challengeParticipation.id);
        }else{
            currentQuestionIndex++;
            loadQuestion(challenge.shuffledQuestions[currentQuestionIndex].id);
            state = 'running'
        }
    }

    nextQuestion()

    async function loadQuestion(id) {
        currentQuestion = null;
        currentQuestion = await getQuestion(id)
        questions = [...questions, currentQuestion];
        //console.log(questions);
    }

    function onQuestionValidated(event) {
        console.log('onQuestionValidated')
        questionValidated=true;
    }
</script>

<progress class="progress progress-success" value={progression} max="100"></progress>

{#if state === 'init'}
    Loading
{:else if state === 'running'}
    {#if currentQuestion}
        {#each questions as question, questionIndex}
            {#if questionIndex === currentQuestionIndex}
                <div
                        in:fly={{ x: 200, duration: 500, delay: 500 }}
                        out:fly={{ x: -200, duration: 500 }}>

                        <Question question={question} participation={challengeParticipation} on:validation={onQuestionValidated}></Question>


                </div>
            {/if}
        {/each}
    {:else}
        <div class="flex justify-center mt-3">
            <div class="w-1/3 text-center">
                <Loader/>
            </div>
        </div>
    {/if}

    {#if questionValidated}
        <button on:click={nextQuestion} class="btn btn-block btn-success">
            {#if (currentQuestionIndex+1)<challenge.questions.length}Next question{:else}Finish{/if}
        </button>
    {/if}

{:else if state === 'ended'}
    <ChallengeFinished challengeParticipation={challengeParticipation}/>
{/if}


