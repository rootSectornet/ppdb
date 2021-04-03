
const Client = require('./client');
class Jenjang extends Client{
    constructor() {
        super();
        this._endpoint = 'area/';
        this._provinsi = 'provinsi/';
    }
    getJenjangData(){
        return [
            {
                "id":1,
                "nama":"SD",
                'image':"SD.png",
                'idParent':0,
                'isParent':false
            },
            {
                "id":2,
                "nama":"SMP",
                'image':"SMP.png",
                'idParent':0,
                'isParent':false
            },
            {
                "id":100,
                "nama":"SMA",
                'image':"SMA.png",
                'idParent':0,
                'isParent':true,
                "child":[
                    {
                        "id":3,
                        "nama":"SMA IPA",
                        'image':"SMA.png",
                    },
                    {
                        "id":5,
                        "nama":"SMA IPS",
                        'image':"SMA.png",
                    },
                ]
            },
            {
                "id":101,
                "nama":"SMK",
                'image':"SMK.png",
                'idParent':0,
                'isParent':true,
                "child":[
                    {
                        "id":6,
                        "nama":"SMK AKUTANSI",
                        'image':"SMK.png",
                    },
                    {
                        "id":7,
                        "nama":"SMK PARAWISATA",
                        'image':"SMK.png",
                    },
                    {
                        "id":8,
                        "nama":"SMK TEKNIK",
                        'image':"SMK.png",
                    },
                ]
            },
            {
                "id":102,
                "nama":"PTN",
                'image':"Mahasiswa.png",
                'idParent':0,
                'isParent':true,
                "child":[
                    {
                        "id":13,
                        "nama":"PTN SHOSUM",
                        'image':"Mahasiswa.png",
                    },
                    {
                        "id":14,
                        "nama":"PTN SAINTEK",
                        'image':"Mahasiswa.png",
                    }
                ]
            },
        ]
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
    getJenjang() {
        return new Promise(function (resolve, reject) {
            this.get('jenjang')
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

module.exports = Jenjang;