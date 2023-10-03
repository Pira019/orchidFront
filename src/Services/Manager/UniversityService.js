
import axios, * as others from 'axios';
export default class UniversityService{
    static baseApiUrl = import.meta.env.VITE_APP_API_URL + "manager/university/";
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
            'Authorization': `Bearer ${UniversityService.storedToken}`
        }
    });
 
    static async save(newUniversity){
        const endPoind = ''
        return this.axiosInstance.post(endPoind,newUniversity);  
    }  

    static async saveAddress(address){
        const endPoind = 'address'
        return this.axiosInstance.post(endPoind,address);  
    }  
 
}