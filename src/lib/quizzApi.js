import {isAuthenticated, token, user} from "../store.js";
import auth from "../authService.js";

function getApiRootUrl() {
    return import.meta.env.VITE_API_URL+'/api/';// 'http://papalingo-back.sitesetapplis.com/api/'
    // return 'http://127.0.0.1:8003/api/'
}
function getApiHost() {
    return import.meta.env.VITE_API_URL;
}

let currentToken;
token.subscribe(function (value) {
    console.log('token updated!')
    currentToken = value
})

export async function getToken() {
    //console.log(currentToken);
    if(currentToken.length>0){
        //console.log('token connu');
        return currentToken;
    }else{
        console.log('token inconnu');
        let auth0Client = await auth.createClient();
        let tokenPromise = await auth0Client.getTokenSilently({
            authorizationParams: {
                audience: 'https://dev-2p5hwpog58m4ahil.us.auth0.com/api/v2/',
            },
        })

        token.set(tokenPromise)
        return tokenPromise
    }

}
async function getDefaultOptions() {

    let token = await getToken();

    return new Promise((successCallback, failureCallback) => {
        let headers = {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
        successCallback(headers);
    });

    /*return {
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentToken
        }
    };*/

}

/*export async function getLastChallenge() {
    let options = getDefaultOptions();
    const url = getApiRootUrl() + 'challenges';

    try {
        const res = await fetch(url, options);
        const challenges = await res.json();
        return challenges[0];
    } catch (error) {
        console.error('There was an error calling ' + url, error);
    }
    return null
}*/

/*export async function getAllChallenges() {
    let options = getDefaultOptions();
    const url = getApiRootUrl() + 'challenges';

    try {
        const res = await fetch(url, options);
        const challenges = await res.json();
        return {'challenges': challenges}
    } catch (error) {
        console.error('There was an error calling ' + url, error);
    }
    return null
}*/
export async function getAllChallengeParticipations() {
    let options = await getDefaultOptions();
    let now = new Date()
    let params = '?endedAt%5Bbefore%5D=' + now.toISOString();
    const url = getApiRootUrl() + 'challenge_participations' + params;

    const res = await fetch(url, options);
    const data = await res.json();

    if (res.ok) {
        return data;
    } else {
        //throw new Error(data);
        console.error('There was an error calling ' + url, error);
    }
    /*
        try {
            const res = await fetch(url, options);
            let challenges = await res.json();
            //return {'challenge_participations': challenges}
        } catch (error) {
            console.error('There was an error calling ' + url, error);
        }
        return await res.json()*/
}

export async function getNextChallenge() {
    let options = await getDefaultOptions();
    const url = getApiRootUrl() + 'challenges/find';
    const res = await fetch(url, options);
    return await res.json();
}

export async function getChallenge(id) {
    let options = await getDefaultOptions();
    const url = getApiRootUrl() + 'challenges/' + id;
    try {
        const res = await fetch(url, options);
        return await res.json();
    } catch (error) {
        console.error('There was an error calling ' + url, error);
    }
    return null
}

export async function postChallengeParticipation(data) {
    const url = getApiRootUrl() + 'challenge_participations';
    let options = await getDefaultOptions();
    options.method = 'POST'
    options.body = JSON.stringify(data)
    const res = await fetch(url, options)
    return await res.json();
}

export async function closeChallengeParticipation(id) {
    return patchChallengeParticipation(id, {'endedAt': new Date()})
}

export async function patchChallengeParticipation(id, data) {
    const url = getApiRootUrl() + 'challenge_participations/' + id+'/close';
    let options = await getDefaultOptions();
    options.method = 'PATCH'
    options.headers['Content-Type'] = 'application/merge-patch+json'
    options.body = JSON.stringify(data)
    const res = await fetch(url, options)
    return await res.json();
}

export async function getAllChallengeParticipation(challengeId) {
    let options = await getDefaultOptions();
    let url = getApiRootUrl() + 'challenge_participations';
    if (challengeId) {
        url += '?challenge=' + challengeId
    }
    try {
        const res = await fetch(url, options);
        return await res.json();
    } catch (error) {
        console.error('There was an error calling ' + url, error);
    }
    return null
}

export async function getChallengeParticipation(id) {
    let options = await getDefaultOptions();
    const url = getApiRootUrl() + 'challenge_participations/' + id;
    const res = await fetch(url, options);
    return await res.json();
}



export async function postAnswer(data) {
    const url = getApiRootUrl() + 'user_answers';
    let options = await getDefaultOptions();
    options.method = 'POST'
    options.body = JSON.stringify(data)
    const res = await fetch(url, options)
    return await res.json();
}

export async function patchAnswer(id, data) {
    const url = getApiRootUrl() + 'user_answers/' + id;
    let options = await getDefaultOptions();
    options.method = 'PATCH'
    options.headers['Content-Type'] = 'application/merge-patch+json'
    options.body = JSON.stringify(data)
    const res = await fetch(url, options)
    return await res.json();
}

export async function getConnectedUser() {
    let options = await getDefaultOptions();
    const url = getApiRootUrl() + 'users/me';
    const res = await fetch(url, options);
    return await res.json();
}

export async function getLessonProgressOfUser() {
    let options = await getDefaultOptions();
    const url = getApiRootUrl() + 'users/me/lesson_progresses';
    const res = await fetch(url, options);
    return await res.json();
}

export async function fetchEntity(questionId) {
    let options = await getDefaultOptions();
    //const url = getApiRootUrl() + 'questions/' + id;
    const url = getApiHost() + questionId;
    const res = await fetch(url, options);
    return await res.json();
}

export async function publishQuestion(id) {
    const url = getApiRootUrl() + 'questions/' + id;
    let options = await getDefaultOptions();
    options.method = 'PATCH'
    options.headers['Content-Type'] = 'application/merge-patch+json'
    options.body = JSON.stringify({'published': true})
    const res = await fetch(url, options)
    return await res.json();
}