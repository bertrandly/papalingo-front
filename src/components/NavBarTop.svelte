<script>
    import {isAuthenticated, user, xpPoints} from "../store.js";
    import {onMount} from "svelte";
    import auth from "../authService.js";
    import {getConnectedUser, getToken} from "$lib/quizzApi.js";
    import {sleep} from "$lib/utils.js";
    import Icon from "@iconify/svelte";

    let auth0Client

    let xp = 0;
    let xpIndicatorCssClass = '';
    xpPoints.subscribe(function (value) {
        if (xp == 0) {
            xp = value
        } else {
            updateXp(value)
        }
    })

    async function updateXp(newValue) {
        for (var i = xp; i <= newValue; i++) {
            xpIndicatorCssClass = 'animate-ping'
            xp = i
            await sleep(100);
            xpIndicatorCssClass = ''
            await sleep(100);
        }
    }

    isAuthenticated.subscribe((value) => {
        console.log('navbar isAuthenticated.suscribe: ' + value);
    })

    /*user.subscribe((value) => {
        console.log('navbar user.suscribe');
        currentUser = value
        if (currentUser) {
            currentUser.then(function (user) {
                xpPoints.set(user.totalXp)
            })
        }
    })*/

    onMount(async () => {

        auth0Client = await auth.createClient();

        auth.loadUserDataWhenConnected(auth0Client)
        /*  let userConnectedPromise = auth0Client.isAuthenticated()
          isAuthenticated.set(await userConnectedPromise)*/
        //user.set(await auth0Client.getUser());
        /* userConnectedPromise.then(function (t) {
             currentUser = getConnectedUser()
             user.set(currentUser)
             currentUser.then(function (user) {
                 xpPoints.set(user.totalXp)
             })
         });*/

    });

    function logout() {
        auth.logout(auth0Client);
    }

</script>
<div class="navbar bg-base-100">

    <div class="navbar-start">
        <div class="dropdown">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/>
                </svg>
            </div>
            <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><a href="/">Homepage</a></li>
                <li><a href="/challenge">Challenge</a></li>
                <li><a href="/progress">Progress</a></li>
                {#if $isAuthenticated}
                    <li class="mt-5"><a href="/" on:click={logout}>Log Out</a>
                {/if}
            </ul>
        </div>
    </div>
    <div class="navbar-center">
        {#if $user}
            <span class="text-xl">{$user.username}</span>
        {/if}
    </div>
    <div class="navbar-end">

        {#if $user && $user.admin}
            <span class={xpIndicatorCssClass}>{xp} XP</span>
            <button class="btn btn-ghost btn-circle">
                <div class="indicator">
                    <Icon icon="solar:user-linear" width="30" height="30"/>
                    <span class="badge badge-xs badge-primary indicator-item"></span>
                </div>
            </button>
        {/if}

    </div>
</div>