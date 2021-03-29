
const Sekolah = require('./../../api/sekolah');
const sekolah = new Sekolah();
export const state = {
    sekolah: [],
}

export const mutations = {
    SET_SEKOLAH(state, value) {
        state.sekolah = value;
    }
}

export const getters = {
    getSekolah(state) {
        return state.sekolah
    }
}

export const actions = {
    DataSekolah(context,id) {
        sekolah.getSekolah(id).then((res) => {
            res = res.map(v => { return { id: v.id, name: v.nama } });
            context.commit('SET_SEKOLAH', res)
            // @ts-ignore
        }).catch((e) => {
            // eslint-disable-next-line no-console
            console.log(e);
        })
    }
}