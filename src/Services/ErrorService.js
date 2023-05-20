import validationMessage from '@/lang/fr.json'
export default class ErrorService {
    constructor() { }

    static handleErrorHttp(codeStatus, message = '') {
        var errorStatus = {
            401: [[validationMessage.error.credentials_do_not_match]],
            422: message,
            404: message
        }

        var error = errorStatus[codeStatus];

        if (error) {
            return {errorMessage :error }
        } 
    }

}