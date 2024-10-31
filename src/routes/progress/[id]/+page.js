/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    return {
        cp_id : params.id
    };
}