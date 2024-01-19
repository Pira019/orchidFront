
import axios, * as others from 'axios';
export default class SettingService{
    static baseApiUrl = import.meta.env.VITE_APP_API_URL + "manager/settings/";
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
            'Authorization': `Bearer ${SettingService.storedToken}`
        }
    });
 
    static async getWatermark(){
        const endPoind = 'watermark';
        return this.axiosInstance.get(endPoind);  
    }  
 
 
}