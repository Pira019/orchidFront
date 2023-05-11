export default function minDate(){
    let currentDate = new Date(); // Get the current date
    let minDate = new Date(currentDate.getFullYear() - 15, currentDate.getMonth(), currentDate.getDate()); // reduce 16 years to the current date
    return minDate.toISOString().substr(0, 10);
}