<script>
    export let text = '';
</script>
<div class="text-center">
    <span class="loading loading-dots loading-lg"></span>
    {#if text}
        <br>
        <small>{text}</small>
    {/if}
</div>