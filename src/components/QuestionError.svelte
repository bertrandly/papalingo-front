<script>
    import QuestionHelp from "./QuestionHelp.svelte";

    export let userAnswer=null;
    export let answer=null;

</script>

<div class="card w-5/6 bg-error text-primary-content">
    <div class="card-body">
        <h2 class="card-title">Oups !</h2>
        <p>The correct answer was:  "{answer}"</p>
        <QuestionHelp userAnswer={userAnswer}/>
    </div>
</div>
