<script>

    import {onMount} from "svelte";

    const messages = [
        "Tu es capable de surmonter tous les obstacles.",
        "Crois en toi, tu es plus fort que tu ne le penses.",
        "Chaque petit pas te rapproche de ton objectif.",
        "Ne baisse jamais les bras, ta persévérance paiera.",
        "Sois fier de chaque progrès, aussi petit soit-il.",
        "Tu as le pouvoir de créer ton propre bonheur.",
        "Ta détermination est ta plus grande force.",
        "Lève-toi chaque jour avec courage et détermination.",
        "Les défis ne font que te rendre plus fort.",
        "Tu es en train de devenir la meilleure version de toi-même.",
        "Crois en toi-même et tout est possible.",
        "Tu es sur le chemin du succès, continue d'avancer.",
        "N'abandonne jamais sur tes rêves, ils valent la peine.",
        "Chaque jour est une nouvelle chance de briller.",
        "Tes efforts ne passeront pas inaperçus, continue à travailler dur.",
        "Les moments difficiles ne durent pas, mais les gens forts perdurent.",
        "Tu es capable de réaliser tout ce que tu désires.",
        "Garde la foi, même quand ça semble impossible.",
        "Tu es une source d'inspiration pour ceux qui t'entourent.",
        "Ta force intérieure est ton plus grand atout.",
        "Les échecs d'aujourd'hui sont les leçons de demain.",
        "Tu es plein de potentiel et de possibilités infinies.",
        "Les meilleures choses arrivent à ceux qui ne baissent jamais les bras.",
        "Chaque jour est une nouvelle opportunité de grandir.",
        "Laisse ta lumière intérieure briller plus fort que jamais.",
        "Tu es capable de transformer tes rêves en réalité.",
        "Ton attitude détermine ton altitude, alors reste positif.",
        "Crois en toi-même, même quand personne d'autre ne le fait.",
        "Chaque obstacle est une occasion de devenir plus fort.",
        "Avec chaque effort, tu te rapproches un peu plus de la réussite."
    ];
    let message=null;

    onMount(async () => {
        var indexAleatoire = Math.floor(Math.random() * messages.length);
        // Récupérer le message correspondant à l'index aléatoire
        message = messages[indexAleatoire];
    });
</script>

{message}