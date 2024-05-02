<script>
    import {fly} from "svelte/transition";
    import Question from "../question/Question.svelte";
    import {closeChallengeParticipation, fetchEntity} from "$lib/quizzApi.js";
    import ChallengeFinished from "./ChallengeFinished.svelte";
    import Loader from "../Loader.svelte";
    import Media from "../media/Media.svelte";
    import {focusOnInit} from "$lib/utils.js";

    export let challengeParticipation

    let challenge = challengeParticipation.challenge
    let questions = [];
    let currentQuestionIndex = -1;
    $: progression = challenge.challengeQuestionAssociations.length > 0 ? (currentQuestionIndex) / (challenge.challengeQuestionAssociations.length) * 100 : 0;
    let currentQuestion = null;
    let state = null;
    let questionValidated = false;
    let readyForNextQuestion = false;
    let wrongQuestions = [];

    const urlParams = new URLSearchParams(window.location.search);
    const debugQuestionId = urlParams.get('qid');

    function nextQuestion() {
        questionValidated = false;
        if (state == 'running' && currentQuestionIndex >= 0 && (currentQuestionIndex + 1) === challenge.challengeQuestionAssociations.length) {
            if (wrongQuestions.length > 0) {
                state = 'mistake_intro'
                currentQuestionIndex = 0;
            } else {
                saveAndClose()
            }
        } else if (state == 'mistake' && currentQuestionIndex >= 0 && (currentQuestionIndex + 1) === wrongQuestions.length) {
            saveAndClose()
        } else if (state == 'mistake_intro') {
            state = 'mistake'
            questions = wrongQuestions
            currentQuestion = questions[0]
        } else if (state == 'mistake') {
            currentQuestionIndex++;
        } else {
            currentQuestionIndex++;
            console.log('currentQuestionIndex: ' + currentQuestionIndex)
            if (debugQuestionId) {

                loadQuestion(debugQuestionId);
            } else {
                loadQuestion(challenge.challengeQuestionAssociations[currentQuestionIndex]);
            }

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
        currentQuestion = await fetchEntity(id)
        questions = [...questions, currentQuestion];
    }

    function onQuestionValidated(event) {
        //console.log('onQuestionValidated')
        questionValidated = true;
        readyForNextQuestion = false;
    }


    function onUserAnswer(event) {
        //console.log('onUserAnswer')
        if (!event.detail.correct && state === 'running') {
            wrongQuestions = [...wrongQuestions, currentQuestion];
        }
        readyForNextQuestion = true
    }
</script>

{#if state === 'running' || state === 'mistake'}
    <progress class="progress progress-success" value={progression} max="100"></progress>
{/if}

<div class="flex justify-center my-5">
    <div class="lg:w-2/3 text-center">

        {#if state === 'running' || state === 'mistake'}
            {#if challenge.media}
                <Media mediaId={challenge.media}/>
            {/if}
        {/if}

        {#if state === 'mistake_intro'}

                    <h2>Everybody deserves a second chance !</h2>
                    {#if wrongQuestions.length == 1}
                        <p>Only one tiny mistake. That will be easy to correct it, right?</p>
                    {:else}
                        <p>Please retry these {wrongQuestions.length} questions</p>
                    {/if}

            <button on:click={nextQuestion} class="btn btn-block btn-success">
                Let's go
            </button>
        {:else if state === 'running' || state === 'mistake'}
            {#if currentQuestion}
                {#each questions as questionInChallenge, questionIndex}
                    {#if questionIndex === currentQuestionIndex}
                        <div
                                in:fly={{ x: 200, duration: 500, delay: 500 }}
                                out:fly={{ x: -200, duration: 500 }}>
                            <Question question={questionInChallenge.question}
                                      reason={questionInChallenge.reason}
                                      relatedToMedia={challenge.media?true:false}
                                      participation={challengeParticipation}
                                      iteration={state === 'mistake'?2:1}
                                      on:validation={onQuestionValidated}
                                      on:userAnswer={onUserAnswer}></Question>
                        </div>
                    {/if}
                {/each}
            {:else}

                        <Loader text="Loading question"/>

            {/if}

            {#if questionValidated}
                {#if readyForNextQuestion}
                    <button on:click={nextQuestion} class="btn btn-block btn-primary" use:focusOnInit>
                        {#if (currentQuestionIndex + 1) < challenge.challengeQuestionAssociations.length}Next question{:else}Finish{/if}
                    </button>
                {:else}
                    <Loader text="Saving your answer"/>
                {/if}
            {/if}

        {:else if state === 'ended'}
            <ChallengeFinished challengeParticipation={challengeParticipation}/>
        {/if}

    </div>
</div>
