<script>

    export let sentance;
    export let otherWords;

    export let sentanceCreated;
    let words = (sentance + ' ' + otherWords).split(' ').sort((a, b) => 0.5 - Math.random());
    let selectedWords = [];
    let selectedWordsIndex = [];

    function addWord(event) {
        selectedWordsIndex = [...selectedWordsIndex, words.indexOf(event.target.innerHTML)];

        selectedWords = [...selectedWords, event.target.innerHTML];
        sentanceCreated = selectedWords.join(' ')

    }
    function removeWord(event) {
        if(selectedWords.length>1){
            let index = selectedWords.indexOf(event.target.innerHTML);
            selectedWords.splice(index, 1);
            selectedWords=selectedWords
        }else{
            selectedWords = []
        }

        //remove in selectedWordsIndex
        let index = words.indexOf(event.target.innerHTML);
        let indexInIndex = selectedWordsIndex.indexOf(index);
        selectedWordsIndex.splice(indexInIndex, 1);
        selectedWordsIndex=selectedWordsIndex
    }

</script>

<div class="flex justify-center my-5">
    <div class="w-5/6 min-h-24">
        {#each selectedWords as word}
            <button class="btn btn-success m-1" on:click|preventDefault={removeWord}>{word}</button>
        {/each}
    </div>
</div>
<hr>
<div class="flex justify-center my-5">
    <div class="w-5/6">
        {#each words as word,index}
            <button class="btn btn-outline m-1" disabled="{selectedWordsIndex.includes(index)?'disabled':''}"  on:click|preventDefault={addWord}>{word}</button>
        {/each}
    </div>
</div>


