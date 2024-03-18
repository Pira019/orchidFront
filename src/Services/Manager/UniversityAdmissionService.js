
import axios, * as others from 'axios';
export default class UniversityAdmissionService{
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
            'Authorization': `Bearer ${UniversityAdmissionService.storedToken}`
        }
    });   

    static async addAdmssion(newAdmssion){
        const endPoind = 'admission'
        return this.axiosInstance.post(endPoind,newAdmssion);  
    } 
}