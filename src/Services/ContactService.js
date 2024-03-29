
import axios, * as others from 'axios';
export default class ContactService{
   static baseApiUrl = import.meta.env.VITE_APP_API_URL;
    /**
   * A class for interacting with the user service API.
   *
   * @param {string} baseApiUrl - The base URL of back end API.
   */

    constructor() {}
    
   
    static async question(requestBody){
        const endPoind =this.baseApiUrl + 'question'
        return axios.post(endPoind,requestBody);  
    }
 
}