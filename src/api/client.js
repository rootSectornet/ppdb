// eslint-disable-next-line no-unused-vars
const axios = require('axios');
class Client{
    constructor(){
        this._BASEURL = "http://localhost:3000/api/";
    }
    getBaseUrl(){
        return this._BASEURL;
    }
    setBaseUrl(url){
        this._BASEURL=url;
    }
    header(){
        return {
            "Content-Type":"multipart/form-data"
        }
    }
    /**
     * @param {string} endpoint The string
    */
    get(endpoint){
        return new Promise(function(resolve,reject){
            axios.get(`${this._BASEURL}${endpoint}`)
            .then(function (result) {
                    resolve(result.data);
                })
            .catch(function (err) {
                    return reject(err);
                });
        }.bind(this));
    }



    /**
     * @param {string} endpoint The string
     * @param {object} data data
    */
    post(endpoint,data){
        return new Promise(function(resolve,reject){
            axios.post(`${this._BASEURL}${endpoint}`,data)
            .then(function (result) {
                    resolve(result.data);
                })
            .catch(function (err) {
                    return reject(err);
                });
        }.bind(this));
    }


    /**
     * @param {string} endpoint The string
     * @param {object} data data
    */
   put(endpoint,data){
        return new Promise(function(resolve,reject){
            axios.put(`${this._BASEURL}${endpoint}`,data)
            .then(function (result) {
                    resolve(result.data);
                })
            .catch(function (err) {
                    return reject(err);
                });
        }.bind(this));
    }

    /**
     * @param {string} endpoint The string
    */
   delete(endpoint){
        return new Promise(function(resolve,reject){
            axios.delete(`${this._BASEURL}${endpoint}`)
            .then(function (result) {
                    resolve(result.data);
                })
            .catch(function (err) {
                    return reject(err);
                });
        }.bind(this));
    }


    /**
     * @param {string} endpoint The string
     * @param {object} data data
    */
    postFormdata(endpoint,data){
        return new Promise(function(resolve,reject){
            axios.post(`${this._BASEURL}${endpoint}`,data,{headers:this.header()})
            .then(function (result) {
                    resolve(result.data);
                })
            .catch(function (err) {
                    return reject(err);
                });
        }.bind(this));
    }
    putFormdata(endpoint,data){
        return new Promise(function(resolve,reject){
            axios.put(`${this._BASEURL}${endpoint}`,data,{headers:this.header()})
            .then(function (result) {
                    resolve(result.data);
                })
            .catch(function (err) {
                    return reject(err);
                });
        }.bind(this));
    }

}
module.exports = Client;