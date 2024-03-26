/** @type {import('../../../../.svelte-kit/types/src/routes').PageLoad} */
export async function load({params}) {
    let options= {
        headers: {
            accept: 'application/json'
        }
    };
    const url = 'http://127.0.0.1:8003/api/challenges/'+params.id;
    const res = await fetch(url, options);

    try {
        const res = await fetch(url, options);
        const challenge = await res.json();
        return challenge;
    } catch (error) {
        // TypeError: Failed to fetch
        console.error('There was an error calling '+url, error);
        return {};
    }

}