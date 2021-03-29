
const Client = require('./client');
class Provinsi extends Client{
    constructor() {
        super();
        this._endpoint = 'area/';
        this._provinsi = 'provinsi/';
    }
    getProvinsi() {
        return new Promise(function (resolve, reject) {
            this.get(this._endpoint+this._provinsi)
            .then((result)=>{
                if (result.success) {
                    resolve(result.data)
                } else {
                    reject(null)
                }
            })
            .catch(err=>reject(err));
        }.bind(this))
    }
    getKota(id) {
        return new Promise(function (resolve, reject) {
            this.get(this._endpoint+"?id_provinsi="+id)
            .then((result)=>{
                if (result.success) {
                    resolve(result.data)
                } else {
                    reject(null)
                }
            })
            .catch(err=>reject(err));
        }.bind(this))
    }
}

module.exports = Provinsi;