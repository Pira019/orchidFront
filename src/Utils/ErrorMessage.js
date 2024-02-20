export default function errorMessage(error) {
    if (!error.response) {
        return "Erreur lors de la requête";
    }

    const responseData = error.response.data;

    if (responseData && responseData.message) {
        return responseData.message;
    }

    return `Erreur ${error.response.status} lors de la requête`;
}
