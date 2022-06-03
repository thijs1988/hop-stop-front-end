import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);
const API_ROOT = process.env.REACT_APP_HOME_DIRECTORY+'/api';
const responseBody = response => response.body;

let token = null;

const tokenPlugin = secured => {
    return (request) => {
        if(token && secured){
            request.set('Authorization', `Bearer ${token}`);
        }
    }
}


export const requests = {
    get: (url, secured = false) => {
        return superagent.get(`${API_ROOT}${url}`).use(tokenPlugin(secured)).then(responseBody);
    },
    post: (url, body = null, secured = true) => {
        return superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin(secured)).then(responseBody);
    },
    setToken: (newJwtToken) => token = newJwtToken,
    delete: (url, secured = false) =>{
        return superagent.del(`${API_ROOT}${url}`).use(tokenPlugin(secured)).then(responseBody);
    },
    patch: (url, body = null, secured = true) => {
        return superagent.patch(`${API_ROOT}${url}`, body).set('Content-Type', 'application/merge-patch+json').use(tokenPlugin(secured)).then(responseBody);
    },
    put: (url, body = null, secured = true) => {
        return superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin(secured)).then(responseBody);
    }
    // sendPayment: (url,body= null, secured = false) => {
    //     return superagent.post(`http://localhost:8000${url}`, body).use(tokenPlugin(secured)).then(responseBody);
    // }
}

