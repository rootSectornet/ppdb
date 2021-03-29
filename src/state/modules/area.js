
const Provinsi = require('./../../api/provinsi');
const provinsi = new Provinsi();
export const state = {
    provinsi: [],
    kota : [],
}

export const mutations = {
    SET_PROVINSI(state, value) {
        state.provinsi = value;
    },
    SET_KOTA(state, value) {
        state.kota = value;
    },
}

export const getters = {
    getProvinsi(state) {
        return state.provinsi
    },
    getKota(state) {
        return state.kota
    }
}

export const actions = {
     // @ts-ignore
     DataProvinsi(context) {
        provinsi.getProvinsi().then((res) => {
            res = res.map(v => { return { id: v.id, name: v.name } });
            context.commit('SET_PROVINSI', res)
            // @ts-ignore
        }).catch((e) => {
            // eslint-disable-next-line no-console
            console.log(e);
        })
    },
    DataKota(context,id) {
        provinsi.getKota(id).then((res) => {
            res = res.map(v => { return { id: v.id, name: v.area } });
            context.commit('SET_KOTA', res)
            // @ts-ignore
        }).catch((e) => {
            // eslint-disable-next-line no-console
            console.log(e);
        })
    }
}