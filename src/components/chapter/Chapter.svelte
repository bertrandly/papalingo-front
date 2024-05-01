<script>
    import {fetchEntity} from "$lib/quizzApi.js";

    export let chapterId
    let chapterPromise
    let isModalOpen = false

    function loadChapter() {
        chapterPromise = fetchEntity(chapterId)
        isModalOpen = true
    }

</script>

<button class="btn" on:click={() => (loadChapter())}>See lesson</button>
<div class="modal" class:modal-open={isModalOpen}>
    <div class="modal-box">
        {#if isModalOpen}
            {#await chapterPromise}
                <div class="skeleton h-32 w-full"></div>
            {:then chapter}
                <div class="card bg-warning text-warning-content">
                    <div class="card-body">
                        {#if chapter.title}
                            <h2 class="card-title">{chapter.title}</h2>
                        {/if}
                        {#if chapter.body}
                            <p>{chapter.body}</p>
                        {:else}
                            <p>Sorry! Nothing here. We're working on it!</p>
                        {/if}
                    </div>
                </div>
            {/await}
        {/if}
        <div class="modal-action">
            <button class="btn" on:click={()=>isModalOpen = false}>Close</button>
        </div>
    </div>
</div>
