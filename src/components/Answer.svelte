<script>
    export let value;
    export let isCorrect=false;
    export let questionValidated=false;

    $:selected = group.includes(value)
    export let group;

    function onclick()
    {
        console.log('on click')
        if(selected){
            group = group.filter(v=>v!=value)
        }
        else{
            group = [...group,value]
        }
    }
</script>

<label for="{value}" class="{selected & questionValidated ? isCorrect?'success':'error' : ''}">
    <input
            disabled="{questionValidated}"
            type="checkbox"
            id="answer"
            value={value}
            name="question"
            on:click={onclick}
    />
    { value } ({questionValidated} / {isCorrect})
    <span class="checkbox"/>
</label>
{ group}
<style>

    label.success{
        background-color: green;
    }
    label.error{
        background-color: darkred;
    }
</style>