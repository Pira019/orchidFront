import {email, helpers,required,minLength} from '@vuelidate/validators'
import validationMessage from '@/lang/fr.json'

export default function customeMessage(attribute,validatorName)
{  
        if(validatorName === 'required'){
           return  helpers.withMessage(validationMessage[attribute] + validationMessage.validations.required, required)
        } 
        if(validatorName === 'email'){
           return  helpers.withMessage(validationMessage.validations.email, email)
        } 
        if(validatorName === 'goodPassword'){
            return validationMessage.validations.goodPassword;
         }
         if(validatorName === 'recaptcha'){
            return validationMessage.validations.recaptcha;
         } 
         if(validatorName === 'success'){
            return validationMessage.messageSuccess.message;
         } 

        
}
