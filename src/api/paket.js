
const Client = require('./client');
class Paket extends Client{
    constructor() {
        super();
        this._endpoint = 'paket/';
    }
    getPaket(id_murid) {
        return new Promise(function (resolve, reject) {
            this.get(this._endpoint+"list?id_murid="+id_murid)
            .then((result)=>{
                if (result.success) {
                    resolve(result.data_paket.paket)
                } else {
                    reject([])
                }
            })
            .catch(err=>reject(err));
        }.bind(this))
    }
}

module.exports = Paket;