<script>

    import auth from "../authService.js";
    import Loader from "../components/Loader.svelte";
    import {onMount} from "svelte";
    import {user, isAuthenticated} from "../store.js";

    let auth0Client;

    const disableButton = async (event) => {
        const node = event.currentTarget;
        node.disabled = true;
    }

    function login() {
        auth.loginWithPopup(auth0Client);
    }

    function logout() {
        auth.logout(auth0Client);
    }

    //let connected = false
    //let currentUser = null
    /*isAuthenticated.subscribe(function (value) {
        //console.log('isAuthenticated.subscribe: '+value)
        //connected = value;
        user.subscribe((value) => {
            console.log(value);
            currentUser = value
        });
    })*/
   /* user.subscribe((value) => {
        currentUser = value
    })*/
    onMount(async () => {
        auth0Client = await auth.createClient();
    });
</script>

<div class="hero ">
    <div class="hero-overlay bg-opacity-0"></div>
    <div class="hero-content text-center text-success">
        <div class="max-w-md">
            <h1 class="mb-5 text-5xl font-bold">
                <img src="logo_papalingo.png" alt="logo"/>
            </h1>
            <p class="mb-5">The only, custom-made, especially for Jeanne, English learning App</p>
            <p class="mb-5">With real piece of BBC inside!</p>

            {#if $isAuthenticated === true}

                {#await $user}
                   <Loader text="What do I know about you?"/>
                {:then userLoaded}
                    <div class="mb-6">
                        <a href="/challenge" class="btn btn-primary " on:click={disableButton}>
                            May the force be with you
                        </a>
                    </div>
                {/await}

                <div class="mt-5">
                    <a class="btn btn-neutral btn-ghost btn-sm" href="/#" on:click={logout}>Log Out</a>
                </div>
            {:else if $isAuthenticated === false}
                <a class="btn btn-primary" href="/#" on:click={login}>Please log In</a>
            {:else}
                <Loader text="Do I know you ?"/>
            {/if}
        </div>
    </div>
</div>
