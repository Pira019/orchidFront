
export default function formattedDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric',  hour: '2-digit', minute: '2-digit'};             
    return new Date(date).toLocaleDateString('fr-FR', options);
}