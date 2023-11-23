import {email, helpers,required,url,maxLength} from '@vuelidate/validators'
import validationMessage from '@/lang/fr.json'

export default function customeMessage(attribute,validatorName,autre=0)
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
         
         if(validatorName === 'url'){
            return  helpers.withMessage(validationMessage.validations.validUrl, url)
         }
         
         if(validatorName === 'maxLength'){
            return  helpers.withMessage(validationMessage[attribute] + validationMessage.validations.maxLength.replace('{maxLength}',autre), maxLength(autre))
         } 


        
}
