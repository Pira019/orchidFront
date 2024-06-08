
import axios, * as others from 'axios';
export default class ProfileManagerService{
    static baseApiUrl = import.meta.env.VITE_APP_API_URL + "manager/profile/";
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
            'Authorization': `Bearer ${ProfileManagerService.storedToken}`
        }
    });  

    static async userProfile(){ 
        return this.axiosInstance.get();  
    }   
 
}