
import axios, * as others from 'axios';
export default class UniversityProgramService{
    static baseApiUrl = import.meta.env.VITE_APP_API_URL + "manager/university_program/";
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
            'Authorization': `Bearer ${UniversityProgramService.storedToken}`
        }
    });  

    static async prefilForm(){
        const endPoind = 'prefil';
        return this.axiosInstance.get(endPoind);  
    }  

    static async delete(idUniversityProgram){
        const endPoind = '/' + idUniversityProgram;
        return this.axiosInstance.delete(endPoind);  
    } 
 
}