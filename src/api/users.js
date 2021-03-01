
const Client = require('./client');
class User extends Client{
    constructor() {
        super();
        this._endpointLogin = 'users/login';
        this._endpointMurid = 'users'
    }
    login(email,password){
        var data = {email,password};
        return new Promise(function(resolve,reject){
            this.post(this._endpointLogin,data)
            .then((result)=>{
                resolve(result)
            })
            .catch(err=>reject(err));
        }.bind(this))
    }
    getTotalMurid() {
        return new Promise(function (resolve, reject) {
            this.get(this._endpointMurid+"?offset=0&limit=1000")
            .then((result)=>{
                if (result.success) {
                    resolve(result.data_murid.total)
                } else {
                    reject(0)
                }
            })
            .catch(err=>reject(err));
        }.bind(this))
    }
}

module.exports = User;