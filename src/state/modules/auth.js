// @ts-nocheck

const User = require('./../../api/users');
const user = new User();
export const state = {
    currentUser: sessionStorage.getItem('authUser'),
}

export const mutations = {
    SET_CURRENT_USER(state, newValue) {
        state.currentUser = newValue
        saveState('auth.currentUser', newValue)
    },
}

export const getters = {
    // Whether the user is currently logged in.
    loggedIn(state) {
        return !!state.currentUser
    },
    user(state){
        return state.currentUser;
    }
}

export const actions = {
    // This is automatically run in `src/state/store.js` when the app
    // starts, along with any other actions named `init` in other modules.
    // eslint-disable-next-line no-unused-vars
    init({ state, dispatch }) {
        dispatch('validate')
    },

    // Logs in the current user.
    logIn(context, { email, password } = {}) {
        const { commit, dispatch, getters } = context;
        if (getters.loggedIn) return dispatch('validate')
        return new Promise((resolve, reject) => {
            user.login(email,password)
            .then((result)=>{
                if(result.success){
                    commit('SET_CURRENT_USER', result.data_login.data_murid);
                    resolve(result.success);
                }else{
                    reject(result.data_login);
                }
            })
            .catch(err=>reject(err));
        });
    },

    // Logs out the current user.
    logOut({ commit }) {
        // eslint-disable-next-line no-unused-vars
        commit('SET_CURRENT_USER', null)
    },

    // register the user
    register({ commit, dispatch, getters }, { email, password } = {}) {
        if (getters.loggedIn) return dispatch('validate')

        commit('SET_CURRENT_USER', email)
            return password
    },

    // register the user
    // eslint-disable-next-line no-unused-vars
    resetPassword({ commit, dispatch, getters }, { email } = {}) {
        if (getters.loggedIn) return dispatch('validate')
        return email
    },

    // Validates the current user's token and refreshes it
    // with new data from the API.
    // eslint-disable-next-line no-unused-vars
    validate({ commit, state }) {
        if (!state.currentUser) return Promise.resolve(null)
        //const user = getFirebaseBackend().getAuthenticatedUser();
        // commit('SET_CURRENT_USER', null)
        return true;
    },
}

// ===
// Private helpers
// ===

function saveState(key, state) {
    window.localStorage.setItem(key, JSON.stringify(state))
}
