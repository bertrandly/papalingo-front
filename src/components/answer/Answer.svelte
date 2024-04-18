<script>
    export let value;
    export let isCorrect=false;
    export let questionValidated=false;

    $:selected = group.includes(value)
    export let group;

    function onclick()
    {
        if(selected){
            group = group.filter(v=>v!=value)
        }
        else{
            group = [...group,value]
        }
    }
</script>

<label class="label cursor-pointer mx-1 flex justify-start grow">
    <input
            disabled="{questionValidated}"
            type="checkbox"
            id="answer"
            value={value}
            name="question"
            class="checkbox checkbox-lg {selected & questionValidated ? isCorrect?'checkbox-success':'checkbox-error' : ''}"
            on:click={onclick}
    />
    <span class="label-text ml-3 {selected & questionValidated ? isCorrect?'text-success':'text-error' : ''}">{ value }</span>
</label>

