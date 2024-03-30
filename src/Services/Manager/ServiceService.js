
import axios, * as others from 'axios';
export default class ServiceService{
    static baseApiUrl = import.meta.env.VITE_APP_API_URL + "manager/service/";
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
            'Authorization': `Bearer ${ServiceService.storedToken}`
        }
    });

    
    static async store(newService){
        const endPoind = ""; 
        return await this.axiosInstance.post(endPoind,newService);
    } 

    static async getAll(){
        const endPoind = ""; 
        return await this.axiosInstance.get(endPoind);
    } 
 
}