
import {createAuth0Client} from "@auth0/auth0-spa-js";
import {user, isAuthenticated, popupOpen, token} from "./store.js";
import config from "./auth_config.js";



async function createClient() {
    let auth0Client = await createAuth0Client({
        domain: config.domain,
        clientId: config.clientId,
        authorizationParams: {
            audience: config.audience
        },
    });

    return auth0Client
}


async function loginWithPopup(client, options) {
    popupOpen.set(true);
    try {
        let p = await client.loginWithPopup(options);
        user.set(await client.getUser());
        isAuthenticated.set( await client.isAuthenticated());
    } catch (e) {
        // eslint-disable-next-line
        console.error(e);
    } finally {
        popupOpen.set(false);
    }
}



function logout(client) {
    return client.logout();
}



const auth = {
    createClient,
    loginWithPopup,
    logout,
}

export default auth;