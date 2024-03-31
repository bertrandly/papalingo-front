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
    let currentQuestion = null;
    let state = 'init';
    let questionValidated=false;

    let wrongQuestions = [];

    function nextQuestion() {
        questionValidated=false;
        if(state == 'running' && currentQuestionIndex>=0 && (currentQuestionIndex+1) === challenge.questions.length){
            if(wrongQuestions.length>0){
                state = 'mistake_intro'
                currentQuestionIndex=0;
            }else{
                saveAndClose()
            }
        }
        else if(state == 'mistake' && currentQuestionIndex>=0 && (currentQuestionIndex+1) === wrongQuestions.length){
           saveAndClose()
        }
        else if(state == 'mistake_intro'){
            state = 'mistake'
            questions = wrongQuestions;
        }
        else if(state == 'mistake'){
            currentQuestionIndex++;
        }else{
            currentQuestionIndex++;
            loadQuestion(challenge.shuffledQuestions[currentQuestionIndex].id);
            state = 'running'
        }
    }

    nextQuestion()

    function saveAndClose() {
        state = 'ended'
        currentQuestionIndex++;
        closeChallengeParticipation(challengeParticipation.id);
    }

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

    function onUserAnswer(event) {
        console.log('onUserAnswer')
        console.log(event.detail)
        if(!event.detail.correct && state === 'running'){
            wrongQuestions = [...wrongQuestions, currentQuestion];
        }
    }
</script>

<progress class="progress progress-success" value={progression} max="100"></progress>

{#if state === 'init'}
    <Loading/>
{:else if state === 'mistake_intro'}
    <div class="flex justify-center my-5">
        <div class="w-1/3 text-center">
            <h2>Everybody deserves a second chance !</h2>
            {#if wrongQuestions.length == 1}
                <p>Only one tiny mistake. That will be easy to correct it, right?</p>
            {:else}
                <p>Please retry these {wrongQuestions.length} questions</p>
            {/if}
        </div>
    </div>
    <button on:click={nextQuestion} class="btn btn-block btn-success">
        Let's go
    </button>
{:else if state === 'running' || state === 'mistake'}
    {#if currentQuestion}
        {#each questions as question, questionIndex}
            {#if questionIndex === currentQuestionIndex}
                <div
                        in:fly={{ x: 200, duration: 500, delay: 500 }}
                        out:fly={{ x: -200, duration: 500 }}>
                        <Question question={question} participation={challengeParticipation} iteration={state === 'mistake'?2:1} on:validation={onQuestionValidated} on:userAnswer={onUserAnswer}></Question>
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


