<script>
    import Icon from "@iconify/svelte";

    export let reason
</script>

{#if reason === 'tuto'}
    <div class="text-left flex flex-row">
        <Icon icon="solar:book-2-broken" style="font-size: 35px;"/>
        <div class="badge badge-primary mt-2">New lesson</div>
    </div>
{:else if reason === 'mstk'}
    <div class="text-left flex flex-row">
        <Icon icon="material-symbols:error" style="font-size: 35px;" />
        <div class="badge badge-error mt-2">Previsous mistake</div>
    </div>
{/if}