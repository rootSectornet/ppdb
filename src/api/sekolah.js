
const Client = require('./client');
class Sekolah extends Client{
    constructor() {
        super();
        this._endpoint = 'sekolah/';
    }
    getSekolah(id) {
        return new Promise(function (resolve, reject) {
            this.get(this._endpoint+"?id_area="+id+"&offset=0&limit=10000")
            .then((result)=>{
                if (result.success) {
                    resolve(result.data_sekolah.data)
                } else {
                    reject(null)
                }
            })
            .catch(err=>reject(err));
        }.bind(this))
    }
}

module.exports = Sekolah;