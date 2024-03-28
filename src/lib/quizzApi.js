
function getApiRootUrl() {
    return import.meta.env.VITE_API_URL;// 'http://papalingo-back.sitesetapplis.com/api/'
   // return 'http://127.0.0.1:8003/api/'
}

function getDefaultOptions() {
    return {
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        }
    };
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
    let options = getDefaultOptions();
    const url = getApiRootUrl() + 'challenge_participations';

    try {
        const res = await fetch(url, options);
        const challenges = await res.json();
        return {'challenge_participations': challenges}
    } catch (error) {
        console.error('There was an error calling ' + url, error);
    }
    return null
}

export async function getNextChallenge() {
    let options = getDefaultOptions();
    const url = getApiRootUrl() + 'challenges/find';
    try {
        const res = await fetch(url, options);
        return await res.json();
    } catch (error) {
        console.error('There was an error calling ' + url, error);
    }
    return null
}

export async function getChallenge(id) {
    let options = getDefaultOptions();
    const url = getApiRootUrl() + 'challenges/'+id;
    try {
        const res = await fetch(url, options);
        const challenge = await res.json();
        return challenge;
    } catch (error) {
        console.error('There was an error calling ' + url, error);
    }
    return null
}

export async function postChallengeParticipation(data) {
    const url = getApiRootUrl() + 'challenge_participations';
    let options = getDefaultOptions();
    options.method = 'POST'
    options.body = JSON.stringify(data)
    const res = await fetch(url, options)
    return await res.json();
}

export async function closeChallengeParticipation(id) {
    return patchChallengeParticipation(id, {'endedAt': new Date()})
}
export async function patchChallengeParticipation(id, data) {
    const url = getApiRootUrl() + 'challenge_participations/'+id;
    let options = getDefaultOptions();
    options.method = 'PATCH'
    options.headers['Content-Type']='application/merge-patch+json'
    options.body = JSON.stringify(data)
    const res = await fetch(url, options)
    return await res.json();
}

export async function getAllChallengeParticipation(challengeId) {
    let options = getDefaultOptions();
    let url = getApiRootUrl() + 'challenge_participations';
    if(challengeId){
        url+='?challenge='+challengeId
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
    let options = getDefaultOptions();
    const url = getApiRootUrl() + 'challenge_participations/'+id;
    try {
        const res = await fetch(url, options);
        const participation = await res.json();
        return participation;
    } catch (error) {
        console.error('There was an error calling ' + url, error);
    }
    return null
}

export async function getQuestion(id) {
    let options = getDefaultOptions();
    const url = getApiRootUrl() + 'questions/' + id;
    const res = await fetch(url, options);
    return await res.json();
}

export async function postAnswer(data) {
    const url = getApiRootUrl() + 'user_answers';
    let options = getDefaultOptions();
    options.method = 'POST'
    options.body = JSON.stringify(data)
    const res = await fetch(url, options)
    return await res.json();
}
export async function patchAnswer(id, data) {
    console.log(id)
    const url = getApiRootUrl() + 'user_answers/'+id;
    let options = getDefaultOptions();
    options.method = 'PATCH'
    options.headers['Content-Type']='application/merge-patch+json'
    options.body = JSON.stringify(data)
    const res = await fetch(url, options)
    return await res.json();
}