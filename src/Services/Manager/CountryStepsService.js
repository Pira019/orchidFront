
import axios, * as others from 'axios';
export default class CountryStepsService{
   static baseApiUrl = import.meta.env.VITE_APP_API_URL;
    /**
   * A class for interacting with the user service API.
   *
   * @param {string} baseApiUrl - The base URL of back end API.
   */

    constructor() {}
    
   
    static async getListCountries(){
        const endPoind =this.baseApiUrl + 'country-to-add-tuto'
        return axios.get(endPoind);  
    }

    static async getCountries(){
        const endPoind =this.baseApiUrl + 'country-steps'
        return axios.get(endPoind);  
    }

    static async saveSteps(data){
        const endPoind =this.baseApiUrl + 'country-steps'
        return axios.post(endPoind,data);  
    }

    static async getByCountry(idCountry){
        const endPoind =this.baseApiUrl + 'country/Steps/' + idCountry
        return axios.get(endPoind);  
    }
 
}