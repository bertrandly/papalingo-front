<script>

    import Loader from "../../../components/Loader.svelte";
    import {onMount} from "svelte";
    import {getNextChallenge, postChallengeParticipation} from "$lib/quizzApi.js";
    import {goto} from "$app/navigation";
    import Icon from "@iconify/svelte";

    let nextChallenge = null  //promise
    let participation = null
    onMount(async () => {


        nextChallenge = getNextChallenge()
        nextChallenge.then(async function (challenge) {
            console.log('challenge found')
            participation = postChallengeParticipation({'challenge': challenge.id})
            participation.then(function (p) {
                console.log('participation created')
                goto('/challenge/' + p.id);
            })
            return participation
        })

    });


</script>
<div class="flex flex-col items-center	">
    {#await nextChallenge}
        <Icon icon="mingcute:quill-pen-line" width="96" height="96" class="animate-bounce "/>
        <Loader text="Building challenge"/>
    {:then challenge}
        {#await participation}
            <Icon icon="material-symbols:check-box-outline" width="96" height="96"/>
            <Loader text="warm up"/>
        {:then p}
            <!--redirect-->
        {/await}
    {/await}
</div>