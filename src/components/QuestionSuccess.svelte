<script>
    import PositiveMessage from "./PositiveMessage.svelte";
    import QuestionHelp from "./QuestionHelp.svelte";
    export let userAnswer=null;
</script>

<div class="card w-5/6 bg-success text-primary-content">
    <div class="card-body">
        <h2 class="card-title">Yeah !</h2>
        <PositiveMessage></PositiveMessage>
        <QuestionHelp userAnswer={userAnswer}/>
    </div>
</div>