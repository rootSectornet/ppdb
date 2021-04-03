const Tryout = require('./../../api/tryout');
const tryout = new Tryout();
//EMPTY,RUNNING,FINISH
export const state = {
    idTryout : 0,
    loading : false,
    matpels : [],
    soals : [],
    indexSoal : 0,
    currentSoal : {},
    history : [],
    indexHistory : 0,
    currentHistory : [],
    tryoutDetail : null,
    rataRata : 0,
    tertinggi : 0,
    terendah : 0,
    totalDiikuti : 0,
    idJenjang : 1,
    tryoutSelected : null,
    detailPembayaran : null,
    rasio : null
}

export const mutations = {
    SET_ID(state,value){
        state.idTryout = value;
    },
    SET_LOADING(state,value){
        state.loading = value
    },
    SET_MATPEL(state,value){
        state.matpels = value
    },
    SET_SOAL(state,value){
        state.soals = value
    },
    SET_CURRENT(state,value){
        state.currentSoal = value
    },
    SET_INDEXSOAL(state,value){
        state.indexSoal = value
    },
    SET_HISTORY(state,value){
        state.history = value
    },
    SET_INDEXHISTORY(state,value){
        state.indexHistory = value
    },
    SET_CURRENTHISTORY(state,value){
        state.currentHistory = value
    },
    SET_TRYOUTDETAIL(state,value){
        state.tryoutDetail = value
    },
    SET_IDJENJANG(state,value){
        state.idJenjang = value
    },
    SET_RATARATA(state,value){
        state.rataRata = value
    },
    SET_TERENDAH(state,value){
        state.terendah = value
    },
    SET_TERTINGGI(state,value){
        state.tertinggi = value
    },
    SET_TOTALDIIKUTI(state,value){
        state.totalDiikuti = value
    },
    SET_TRYOUTSELECTED(state,value){
        state.tryoutSelected = value
    },
    SET_DETAILPEMBAYARAN(state,value){
        state.detailPembayaran = value
    },
    SET_RASIO(state,value){
        state.rasio = value
    }
}

export const getters = {
    idTryout(state) {
        return state.idTryout
    },
    loading(state) {
        return state.loading
    },
    matpels(state) {
        return state.matpels
    },
    soals(state) {
        return state.soals
    },
    currentSoal(state) {
        return state.currentSoal
    },
    indexSoal(state) {
        return state.indexSoal
    },
    history(state) {
        return state.history
    },
    indexHistory(state) {
        return state.indexHistory
    },
    currentHistory(state) {
        return state.currentHistory
    },
    tryoutDetail(state) {
        return state.tryoutDetail
    },
    idJenjang(state) {
        return state.idJenjang
    },
    rataRata(state) {
        return state.rataRata
    },
    terendah(state) {
        return state.terendah
    },
    tertinggi(state) {
        return state.tertinggi
    },
    totalDiikuti(state) {
        return state.totalDiikuti
    },
    tryoutSelected(state) {
        return state.tryoutSelected
    },
    detailPembayaran(state) {
        return state.detailPembayaran
    },
    rasio(state) {
        return state.rasio
    }
}

export const actions = {
    // @ts-ignore
    startTryout(context,idSekolah) {
        var user = context.rootGetters["auth/user"];
        var jenjang = context.rootGetters["jenjang/getSelected"];
        var paket = context.rootGetters["paket/getSelected"];
        var today = new Date().toISOString().slice(0, 10);
        console.log(paket)
        if(user != null){
            var param = {
                id_murid : user.id,
                id_jenjang : jenjang.id,
                id_paket : paket.id_paket,
                idSekolahTujuan : idSekolah,
                tgl : today
            }
            return new Promise((resolve, reject) => {
                tryout.startTryout(param)
                .then((result)=>{
                    context.commit('SET_ID', result);
                    tryout.getMatpel(result)
                    .then((resultM)=>{
                        context.commit('SET_MATPEL', resultM);
                        context.commit("state/SET_STATE","MATPEL",{ root: true });
                        resolve(resultM);
                    })
                    .catch(err=>reject(err));
                })
                .catch(err=>reject(err));
            });
        }
   },
   checkPembahasan(context,tryoutDetail) {
        context.commit('SET_TRYOUTDETAIL', tryoutDetail);
        context.commit("state/SET_MATPEL",{...tryoutDetail},{ root: true });
        context.commit("state/SET_STATE","PEMBAHASAN",{ root: true });
    },
   getSoals(context,tryoutDetail) {
        context.commit('SET_TRYOUTDETAIL', tryoutDetail);
        context.commit("state/SET_MATPEL",{...tryoutDetail},{ root: true });
        context.commit("state/SET_STATE","SOAL",{ root: true });
    },
    next(context){
        var soal = context.getters['soals'];
        var currentIndex = context.getters['indexSoal'];
        if(currentIndex == (soal.length-1)){
            currentIndex = 0;
        }else{
            currentIndex++;
        }
        context.commit('SET_CURRENT', soal[currentIndex]);
        context.commit('SET_INDEXSOAL', currentIndex);
    },
    prev(context){
        var soal = context.getters['soals'];
        var currentIndex = context.getters['indexSoal'];
        if(currentIndex == 0){
            currentIndex = 0;
        }else{
            currentIndex--;
        }
        context.commit('SET_CURRENT', soal[currentIndex]);
        context.commit('SET_INDEXSOAL', currentIndex);
    },
    goToIndex(context,index){
        var soal = context.getters['soals'];
        context.commit('SET_CURRENT', soal[index]);
        context.commit('SET_INDEXSOAL', index);
    },
    jawab(context,jawaban){
        var soal = context.getters['soals'];
        var currentIndex = context.getters['indexSoal'];
        soal[currentIndex] = jawaban;
        console.log(soal[currentIndex]);
        context.commit('SET_SOAL', soal);
        return true;
    },
    getHistory(context) {
        var user = context.rootGetters["auth/user"];
        var idJenjang = context.getters['idJenjang'];
        if(user != null){
            return new Promise((resolve, reject) => {
                tryout.history(user.id)
                .then((result)=>{
                    result = result.map((v)=>{
                        return {
                            icon : tryout.jenjangIcon(v.jenjang),
                            ...v
                        }
                    })

                    var filterAnalisa = result.filter((f)=>{
                        return f.jenjang == idJenjang
                    })
                    console.log(filterAnalisa);
                    if(filterAnalisa.length >0){
                        var Nilai = 0;
                        Promise.all([filterAnalisa.forEach(element => {
                            Nilai += element.totalNilai;
                        })])
                        context.commit("SET_RATARATA",tryout.duaDigitAfterComma(Nilai/filterAnalisa.length))
                        context.commit("SET_TERTINGGI",tryout.duaDigitAfterComma(Math.max.apply(Math, filterAnalisa.map(function(o) { return o.totalNilai; }))))
                        context.commit("SET_TERENDAH",tryout.duaDigitAfterComma(Math.min.apply(Math, filterAnalisa.map(function(o) { return o.totalNilai; }))))
                        context.commit("SET_TOTALDIIKUTI",filterAnalisa.length)
                    }else{
                        context.commit("SET_RATARATA",0)
                        context.commit("SET_TERTINGGI",0)
                        context.commit("SET_TERENDAH",0)
                        context.commit("SET_TOTALDIIKUTI",0)
                    }

                    // eslint-disable-next-line no-unused-vars
                    result = new Array(Math.ceil(result.length / 3)).fill().map(_ => result.splice(0, 3))
                    context.commit('SET_HISTORY', result);
                    context.commit('SET_CURRENTHISTORY', result[0]);
                    resolve(result);
                })
                .catch(err=>reject(err));
            });
        }
    },
    slideHistory(context){
        var history = context.getters['history'];
        var currentIndex = context.getters['indexHistory'];
        if(currentIndex == (history.length-1)){
            currentIndex = 0;
        }else{
            currentIndex++;
        }
        context.commit('SET_CURRENTHISTORY', history[currentIndex]);
        context.commit('SET_INDEXHISTORY', currentIndex);
    },
    getMatpelTryout(context,id_tryout){
        console.log(id_tryout);
        return new Promise((resolve, reject) => {
            tryout.getMatpel(id_tryout)
            .then((resultM)=>{
                context.commit('SET_MATPEL', resultM);
                context.commit('SET_ID', id_tryout);
                context.commit("state/SET_STATE","MATPEL",{ root: true });
                resolve(resultM);
            })
            .catch(err=>reject(err));
        });
    },
    finishTryout(context,id_tryout){
        return new Promise((resolve, reject) => {
            tryout.finishTryout(id_tryout)
            .then((resultM)=>{
                context.commit('SET_ID', 0);
                context.commit("state/SET_STATE","RANGKING",{ root: true });
                context.dispatch('getHistory');
                resolve(resultM);
            })
            .catch(err=>reject(err));
        });
    },
    checkPayment(context,history){
        context.commit('SET_LOADING', true);
        var user = context.rootGetters["auth/user"];
        context.commit('SET_DETAILPEMBAYARAN', null);
        if(user != null){
            context.commit('SET_TRYOUTSELECTED', history);
            context.commit('SET_RASIO', null);
            tryout.checkPayment(user.id,history.id)
            .then((result)=>{
                if(result.success){
                    if(result.data_bayar.status){
                        tryout.getRasio(user.id,history.id)
                        .then((resultR)=>{
                            context.commit("state/SET_STATE","PARSINGGRADE",{ root: true });
                            context.commit('SET_LOADING', false);
                            if(resultR.length > 0){
                                context.commit('SET_RASIO', resultR[0].dataSekolah[0]);
                            }
                        })
                        .catch(err=>{console.log(err);
                            context.commit('SET_LOADING', false);});
                    }else{
                        context.commit('SET_DETAILPEMBAYARAN', result.data_bayar);
                        context.commit("state/SET_STATE","METODEPEMBAYARAN",{ root: true });
                        context.commit('SET_LOADING', false);
                    }
                }else{
                    context.commit("state/SET_STATE","METODEPEMBAYARAN",{ root: true });
                    context.commit('SET_LOADING', false);
                }
            })
            .catch(err=>{console.log(err);
            context.commit('SET_LOADING', false);});
        }
    },
    bayar(context,data){
        context.commit('SET_LOADING', true);
        var history = context.getters['tryoutSelected'];
        return new Promise((resolve, reject) => {
            tryout.bayar(data)
            .then((resultM)=>{
                context.dispatch('checkPayment',history);
                resolve(resultM);
            })
            .catch(err=>{reject(err);
                context.commit('SET_LOADING', false);});
        });
    }
}
