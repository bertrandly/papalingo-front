/** @type {import('../../.svelte-kit/types/src/routes').PageLoad} */

import { redirect } from '@sveltejs/kit';
import { goto } from '$app/navigation';
export async function load({params}) {


    let options= {
        headers: {
            accept: 'application/json'
        }
    };
    const url = 'http://127.0.0.1:8003/api/challenges';
    //const res = await fetch(url, options);

    try {
        const res = await fetch(url, options);
        const challenges = await res.json();
        console.log(challenges)
        console.log('/challenge/'+challenges[0].id)
        goto('/challenge/'+challenges[0].id);
    } catch (error) {
        // TypeError: Failed to fetch
        console.error('There was an error calling '+url, error);
    }

}