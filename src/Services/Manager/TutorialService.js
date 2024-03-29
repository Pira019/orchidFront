
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

    static async getByStepCountryId(stepCountryId){
        const endPoind = 'step-country/' + stepCountryId;
        return this.axiosInstance.get(endPoind);  
    }

    static async editTuto(updated){
        const endPoind = ''
        return this.axiosInstance.post(endPoind,updated);  
    } 

    static async delete(idTuto){
        const endPoind = '/' + idTuto;
        return this.axiosInstance.delete(endPoind);  
    } 

    static async addVideoTuto(extraTuto){
        const endPoind = 'add-tuto-video'
        return this.axiosInstance.post(endPoind,extraTuto,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });  
    } 
 
}