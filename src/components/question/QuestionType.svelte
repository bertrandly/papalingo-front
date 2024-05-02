<script>
    import Icon from "@iconify/svelte";

    export let reason
</script>

{#if reason === 'tuto'}
    <div class="text-left flex flex-row">
        <Icon icon="iconoir:database-script-plus" width="30" height="30" class="text-info"/>
        <div class="badge badge-info mt-2 ml-2">New lesson</div>
    </div>
{:else if reason === 'mstk'}
    <div class="text-left flex flex-row">
        <Icon icon="iconoir:chat-bubble-error" width="30" height="30" class="text-error"/>
        <div class="badge badge-error mt-2 ml-2">Previsous mistake</div>
    </div>
{:else if reason === 'new'}
    <div class="text-left flex flex-row">
        <Icon icon="iconoir:star" width="30" height="30" class="text-warning"/>
        <div class="badge badge-warning mt-2 ml-2">New question</div>
    </div>
{:else if reason === 'act'}
    <div class="text-left flex flex-row">
        <Icon icon="iconoir:map-pin" width="30" height="30" class="text-primary"/>
        <div class="badge badge-primary mt-2 ml-2">Active lesson</div>
    </div>
{:else if reason === 'rev'}
    <div class="text-left flex flex-row">
        <Icon icon="iconoir:brain-research" width="30" height="30" class="text-secondary"/>
        <div class="badge badge-secondary mt-2 ml-2">Revision</div>
    </div>
{/if}
