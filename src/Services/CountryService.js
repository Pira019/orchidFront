
import axios, * as others from 'axios';
export default class CountryService{
    static baseApiUrl = import.meta.env.VITE_APP_API_URL; 
    
    constructor() { }      
    

    static axiosInstance = axios.create({
        baseURL: this.baseApiUrl
    });
 

    static async getCities(coutryId){
        const endPoind ='cities/' + coutryId; 
        return this.axiosInstance.get(endPoind)
    }
 
 
}