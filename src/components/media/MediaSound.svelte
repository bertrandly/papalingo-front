<script>
    import {Howl} from 'howler';
    import Icon from "@iconify/svelte";

    export let media
    let sound;
    let soundPlayed=false

    sound = new Howl({
        src: [media.filePath],
        html5: true
    });

    function toggleSound() {
        if(soundPlayed){
            sound.stop();
            console.log('stop')
            soundPlayed=false;
        }else{
            sound.play();
            console.log('play')
            soundPlayed=true;
            // Clear listener after first call.
            sound.once('load', function () {
                sound.play();
            });

            // Fires when the sound finishes playing.
            sound.on('end', function () {
                console.log('Finished!');
            });
        }
    }


</script>

<div class="text-center my-4">
    <button on:click={toggleSound} class="btn btn-neutral btn-square text-white" style="font-size: 44px;">
        {#if soundPlayed}
            <Icon icon="mdi:pause" />
        {:else }
            <Icon icon="mdi:play-outline" />
        {/if}
    </button>
</div>


