
import axios, * as others from 'axios';
export default class CountryStepsService{
    static baseApiUrl = import.meta.env.VITE_APP_API_URL + "manager/";
    static storedToken = localStorage.getItem('authUserToken'); //  
    /**
   * A class for interacting with the user service API.
   *
   * @param {string} baseApiUrl - The base URL of back end API.
   */

    constructor() { }      
    

    static axiosInstance = axios.create({
        baseURL: this.baseApiUrl,
        headers: {
            'Authorization': `Bearer ${CountryStepsService.storedToken}`
        }
    });

    static async getListCountries(){
        const endPoind =this.baseApiUrl + 'country-to-add-tuto'
        return axios.get(endPoind);  
    }

    static async getCountries(){
        const endPoind ='country-steps'; 
        return this.axiosInstance.get(endPoind)
    }

    static async saveSteps(data){
        const endPoind ='country-steps'
        return this.axiosInstance.post(endPoind,data);  
    }

    static async getByCountry(idCountry){
        const endPoind = 'country/Steps/' + idCountry
        return this.axiosInstance.get(endPoind);  
    }

    static async editStep(updatedData){
        const endPoind = 'country/steps/edit/' + updatedData.id
        return this.axiosInstance.post(endPoind,updatedData);  
    }
 
}