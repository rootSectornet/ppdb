
const Client = require('./client');
class Tryout extends Client{
    constructor() {
        super();
        this._endpoint = 'tryout/';
    }
    duaDigitAfterComma(digit){
        var num = Number(digit) // The Number() only visualizes the type and is not needed
        var roundedString = num.toFixed(2);
        var rounded = Number(roundedString); 
        return rounded;
    }
    jenjangIcon(id){
        var list = {
            '1':'SD.png',
            '2':'SMP.png',
            '3':'SMA.png',
            '5':'SMA.png',
            '6':'SMK.png',
            '7':'SMK.png',
            '8':'SMK.png',
            '13':'Mahasiswa.png',
            '14':'Mahasiswa.png',
            '16':'PONDOK.png',
        }
        return list[id];
    }
    startTryout(data) {
        return new Promise(function (resolve, reject) {
            this.post(this._endpoint,data)
            .then((result)=>{
                if (result.success) {
                    resolve(result.data)
                } else {
                    reject("Tryout Sedang Tidak Bisa gunakan!")
                }
            })
            .catch(err=>reject(err));
        }.bind(this))
    }
    getMatpel(idTryout){
        return new Promise(function (resolve, reject) {
            this.get("tryoutdetails?id_tryout="+idTryout)
            .then((result)=>{
                if (result.success) {
                    resolve(result.data)
                } else {
                    reject("Tryout Sedang Tidak Bisa gunakan!")
                }
            })
            .catch(err=>reject(err));
        }.bind(this))
    }
    getSoals(id_matpel,id_tryout_detail){
        return new Promise(function (resolve, reject) {
            this.get(`tryout/soals/?id_matpel=${id_matpel}&id_tryout_detail=${id_tryout_detail}`)
            .then((result)=>{
                if (result.success) {
                    resolve(result.data_tryout)
                } else {
                    reject("Tryout Sedang Tidak Bisa gunakan!")
                }
            })
            .catch(err=>reject(err));
        }.bind(this))
    }
    history(id_murid){
        return new Promise(function (resolve, reject) {
            this.get(`HistoryTryout?id_murid=${id_murid}`)
            .then((result)=>{
                if (result.success) {
                    resolve(result.data_tryout)
                } else {
                    reject("Tryout Sedang Tidak Bisa gunakan!")
                }
            })
            .catch(err=>reject(err));
        }.bind(this))
    }
    kumpulkan(data){
        return new Promise(function (resolve, reject) {
            this.put(`UpdateJawabans`,data)
            .then((result)=>{
                if (result.success) {
                    resolve(result.data_tods)
                } else {
                    reject("Tryout Sedang Tidak Bisa gunakan!")
                }
            })
            .catch(err=>reject(err));
        }.bind(this))
    }
    finishMatpel(id){
        return new Promise(function (resolve, reject) {
            this.post(`finishTryoutDetail/${id}`)
            .then((result)=>{
                if (result.success) {
                    resolve(result.data)
                } else {
                    reject("Tryout Sedang Tidak Bisa gunakan!")
                }
            })
            .catch(err=>reject(err));
        }.bind(this))
    }
    finishTryout(id){
        return new Promise(function (resolve, reject) {
            this.post(`finishTryout/${id}`)
            .then((result)=>{
                if (result.success) {
                    resolve(result.data)
                } else {
                    reject("Tryout Sedang Tidak Bisa gunakan!")
                }
            })
            .catch(err=>reject(err));
        }.bind(this))
    }
    checkPayment(id_murid,id_tryout){
        return new Promise(function (resolve, reject) {
            this.get(`bayar/check/?id_murid=${id_murid}&id_tryout=${id_tryout}`)
            .then((result)=>{
                resolve(result)
            })
            .catch(err=>reject(err));
        }.bind(this))
    }
    bayar(data) {
        return new Promise(function (resolve, reject) {
            this.post('bayar',data)
            .then((result)=>{
                if (result.success) {
                    resolve(result.data)
                } else {
                    reject("Tryout Sedang Tidak Bisa gunakan!")
                }
            })
            .catch(err=>reject(err));
        }.bind(this))
    }
    getRasio(id_murid,id_tryout){
        return new Promise(function (resolve, reject) {
            this.get(`RasioGrades/?id_murid=${id_murid}&id=${id_tryout}&limit=100`)
            .then((result)=>{
                if (result.success) {
                    resolve(result.data_tryout)
                } else {
                    reject("Tryout Sedang Tidak Bisa gunakan!")
                }
            })
            .catch(err=>reject(err));
        }.bind(this))
    }
}

module.exports = Tryout;