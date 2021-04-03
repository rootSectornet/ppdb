
const Jenjang = require('./../../api/jenjang');
const jenjang = new Jenjang();
export const state = {
    dataModel: jenjang.getJenjangData(),
    selected : null,
    showBackButton : false,
    jenjangs : []
}

export const mutations = {
    SET_SELECTED(state,value){
        state.selected = value;
    },
    SET_JENJANG(state,value){
        state.dataModel = value;
    },
    SET_JENJANGS(state,value){
        state.jenjangs = value;
    },
    SET_BACKBUTTON(state,value){
        state.showBackButton = value;
    }
}

export const getters = {
    getData(state) {
        return state.dataModel
    },
    jenjangs(state) {
        return state.jenjangs
    },
    getSelected(state) {
        return state.selected
    },
    getshowBackButton(state) {
        return state.showBackButton
    }
}

export const actions = {
    // @ts-ignore
    resetJenjang(context) {
        context.commit('SET_SELECTED', null)
        context.commit('SET_JENJANG', jenjang.getJenjangData())
   },
   getJenjang(context) {
    return new Promise((resolve, reject) => {
        jenjang.getJenjang()
        .then((result)=>{
            context.commit('SET_JENJANGS',result)
            resolve(result);
        })
        .catch(err=>reject(err));
    });
  }
}
