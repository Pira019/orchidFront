
import axios, * as others from 'axios';
export default class ExtraTutorialService{
    static baseApiUrl = import.meta.env.VITE_APP_API_URL + "manager/tutorial-video/";
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
            'Authorization': `Bearer ${ExtraTutorialService.storedToken}`
        }
    });

    
    static async deleteVideoTuto(id,videoId){
        const endPoind = id +'/' + videoId; 
        return this.axiosInstance.delete(endPoind);
    } 
 
}