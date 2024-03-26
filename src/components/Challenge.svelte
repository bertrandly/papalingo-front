<script>
    import {fly} from "svelte/transition";
    import Question from "./Question.svelte";

    export let challenge;

    let questions = [];
    let currentQuestionIndex = null;
    let currentQuestion = null;
    let state = 'init';
    let questionValidated=false;

    function nextQuestion() {
        questionValidated=false;
        if((currentQuestionIndex+1) === challenge.questions.length){
            state = 'ended'
        }else{
            if (currentQuestionIndex === null) {
                currentQuestionIndex = 0;
            } else {
                currentQuestionIndex++;
            }
            loadQuestion(challenge.questions[currentQuestionIndex].id);
            state = 'running'
        }

    }

    nextQuestion()

    async function loadQuestion(id) {
        currentQuestion = null
        let options = {
            headers: {
                accept: 'application/json'
            }
        };
        const url = 'http://127.0.0.1:8003/api/questions/' + id;
        const res = await fetch(url, options);
        currentQuestion = await res.json();

        questions = [...questions, currentQuestion];
        console.log(questions);
    }

    function onQuestionValidated(event) {
        console.log(event)
        questionValidated=true;
    }
</script>

{#if state === 'init'}
    Loading
{:else if state === 'running'}
    {#each questions as question, questionIndex}
        {#if questionIndex === currentQuestionIndex}
            <div
                    in:fly={{ x: 200, duration: 500, delay: 500 }}
                    out:fly={{ x: -200, duration: 500 }}>
                <Question question={question} on:validation={onQuestionValidated}></Question>

            </div>
        {/if}
    {/each}

    {#if questionValidated}
        <button on:click={nextQuestion}>Next</button>
    {/if}

{:else if state === 'ended'}
    Fin
{/if}


