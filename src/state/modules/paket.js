const Paket = require('./../../api/paket');
const paket = new Paket();
export const state = {
    data : [],
    selected : null,
}

export const mutations = {
    SET_SELECTED(state,value){
        state.selected = value;
    },
    SET_DATA(state,value){
        state.data = value;
    }
}

export const getters = {
    getData(state) {
        return state.data
    },
    getSelected(state) {
        return state.selected
    }
}

export const actions = {
    // @ts-ignore
    getPaket(context) {
        var user = context.rootGetters["auth/user"];
        if(user != null){
            return new Promise((resolve, reject) => {
                paket.getPaket(user.id)
                .then((result)=>{
                    context.commit('SET_DATA', result);
                    context.commit('SET_SELECTED', result[Math.floor((Math.random()*result.length))]);
                    resolve(result);
                })
                .catch(err=>reject(err));
            });
        }
   }
}
