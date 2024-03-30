<script>

    import {onMount} from "svelte";

    const messages = [
        "Bravo on your achievement!",
        "Way to go, you did it!",
        "Congratulations, you've earned it!",
        "Well done, you're a star!",
        "Fantastic job, keep shining!",
        "Hats off to you, amazing work!",
        "Bravo, you've made us proud!",
        "Congratulations, you're a champion!",
        "Outstanding performance, keep up the great work!",
        "Bravo on your achievement!",
        "Way to go, you did it!",
        "Congratulations, you've earned it!",
        "Kudos on your outstanding accomplishment!",
        "Well done, you're a star!",
        "Fantastic job, keep shining!",
        "Hats off to you, amazing work!",
        "Bravo, you've made us proud!",
        "Congratulations, you're a champion!",
        "Outstanding performance, keep up the great work!",
        "High fives and congratulations on your milestone!",
        "You're unstoppable, congratulations!",
        "Cheers to your incredible success!",
        "Hooray, you're a rockstar!",
        "Your hard work paid off, congratulations!",
        "Hip hip hooray, you're a winner!",
        "You're on fire, keep up the fantastic work!",
        "Standing ovation for your remarkable achievement!",
        "Thumbs up for a job well done, congratulations!",
        "You nailed it, congratulations are in order!"
    ];
    let message = null;

    onMount(async () => {
        var indexAleatoire = Math.floor(Math.random() * messages.length);
        // Récupérer le message correspondant à l'index aléatoire
        message = messages[indexAleatoire];
    });
</script>

{message}