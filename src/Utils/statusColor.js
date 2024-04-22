const StatusServiceEnum = Object.freeze({
    PUBLIE: "PUBLIBLIE",
    DESACTIVEE: "DESACTIVE",
    NON_PUBLIE: "NON_PUBLIE"
});

// Définition des couleurs pour chaque état
const colors = {
    PUBLIE: "text-success",
    DESACTIVE: "text-success",
    NON_PUBLIE: "text-warning"
};

export function getColorForStaus(status){
    return colors[status] || "text-dark";
}