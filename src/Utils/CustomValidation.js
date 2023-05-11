export default function goodPassword(password){   
    return password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[#?!@$%^&*-]/.test(password)
}