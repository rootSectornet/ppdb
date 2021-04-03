/*
RANGKING
INTRO
MATPEL
SOAL
PEMBAHASAN
PENILAIAN
METODEPEMBAYARAN
PARSINGGRADE
*/

export const state = {
    stateTest: "RANGKING",
    matpel : {}
}

export const mutations = {
    SET_STATE(state, value) {
        state.stateTest = value;
    },
    SET_MATPEL(state, value) {
        state.matpel = value;
    }
}

export const getters = {
    stateTest(state) {
        return state.stateTest
    },
    matpel(state) {
        return state.matpel
    }
}
