<script>

    import Loader from "../components/Loader.svelte";

    let loading=false;
    const changePage = async () => {
        loading = true;
    }
</script>

<div class="hero min-h-screen">
    <div class="hero-overlay bg-opacity-0"></div>
    <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md">
            <h1 class="mb-5 text-5xl font-bold">
                <img src="logo_papalingo.png">
            </h1>
            <p class="mb-5">The only, custom-made, especially for Jeanne, English learning App</p>
            {#if !loading}
                <a href="/challenge" class="btn btn-primary" on:click={changePage}>Get Started</a>
            {:else}
                <Loader/>
            {/if}
        </div>
    </div>
</div>