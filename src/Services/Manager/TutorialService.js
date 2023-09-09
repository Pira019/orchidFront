
import axios, * as others from 'axios';
export default class TutorialService{
    static baseApiUrl = import.meta.env.VITE_APP_API_URL + "manager/tutorial/";
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
            'Authorization': `Bearer ${TutorialService.storedToken}`
        }
    });

    static async getFlagUrlAndNameOfCountriesWithSteps(){
        const endPoind = 'countries'
        return this.axiosInstance.get(endPoind);  
    } 

    static async getCountryStepsByCountryId(idCountry){
        const endPoind = 'country/' + idCountry
        return this.axiosInstance.get(endPoind);  
    } 

    static async save(newTutorial){
        const endPoind = 'save'
        return this.axiosInstance.post(endPoind,newTutorial);  
    } 
 
}