
import axios, * as others from 'axios';
export default class AuthManagerService{
   static baseApiUrl = import.meta.env.VITE_APP_API_URL + "manager/";
    /**
   * A class for interacting with the user service API.
   *
   * @param {string} baseApiUrl - The base URL of back end API.
   */

    constructor() {} 

    static async authentication(credentials){
        const endPoind =this.baseApiUrl + 'login'
        return axios.post(endPoind,credentials);  
    }
 
}