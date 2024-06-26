import { navigateToRoute } from './Navigation';
export default function errorMessage(error,redirect=false) { 
    if (!error.response) {
        return "Erreur lors de la requête";
    }

     redirect && navigateToRoute(error.response.status);

    const responseData = error.response.data;

    if (responseData && responseData.message) {
        return responseData.message;
    }

    return `Erreur ${error.response.status} lors de la requête`;
}
