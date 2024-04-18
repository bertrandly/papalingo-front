<script>
    import {isAuthenticated, user, xpPoints} from "../store.js";
    import {onMount} from "svelte";
    import auth from "../authService.js";
    import {getConnectedUser, getToken} from "$lib/quizzApi.js";
    import {sleep} from "$lib/utils.js";

    let auth0Client
    let currentUser;

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
        console.log('navbar isAuthenticated.suscribe: '+value);

        /*value.then(function (t) {
            currentUser = getConnectedUser()
            user.set(currentUser)
            currentUser.then(function (user) {
                xpPoints.set(user.totalXp)
            })
        })*/
    })

    user.subscribe((value) => {
        console.log('navbar user.suscribe');
        currentUser = value
        if(currentUser){
            currentUser.then(function (user) {
                xpPoints.set(user.totalXp)
            })
        }
    })

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
                <!-- <li><a>Portfolio</a></li>
                 <li><a>About</a></li>-->
                {#if $isAuthenticated}
                <li class="mt-5" ><a href="/" on:click={logout}>Log Out</a>
                {/if}
            </ul>
        </div>
    </div>
    <div class="navbar-center">
        {#if currentUser}
            {#await currentUser}
            {:then user}
                <span class="text-xl">{user.username}</span>
            {/await}
        {/if}
    </div>
    <div class="navbar-end">

        {#await currentUser}
        {:then user}
            {#if user && user.admin }
                <span class={xpIndicatorCssClass}>{xp} XP</span>
            {/if}
            <span>
                <div class="badge badge-primary ml-3">Connected</div>
            </span>
        {/await}


        <!--
            <button class="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            </button>
            <button class="btn btn-ghost btn-circle">
               <div class="indicator">
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                             d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                   </svg>
                   <span class="badge badge-xs badge-primary indicator-item"></span>
               </div>
            </button>
        -->
    </div>
</div>