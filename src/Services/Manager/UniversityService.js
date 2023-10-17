
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

    static async universitiesByCountryId(countryId){
        const endPoind = 'list/country/' + countryId;
        return this.axiosInstance.get(endPoind);  
    } 

    static async showById(id){
        const endPoind = '/' + id;
        return this.axiosInstance.get(endPoind);  
    } 

    static async update(upDateData){
        const endPoint = 'update/' + upDateData.id;
        return this.axiosInstance.post(endPoint,upDateData);  
    } 
 
}