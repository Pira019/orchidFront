const StatusServiceEnum = Object.freeze({
    PUBLIE: "PUBLIBLIE",
    DESACTIVEE: "DESACTIVE",
    NON_PUBLIE: "NON PUBLIE"
});

// Définition des couleurs pour chaque état
const colors = {
    PUBLIE: "bg-success",
    DESACTIVE: "bg-success",
    NON_PUBLIE: "bg-secondary"
};

export function getColorForStatus(status){
    return colors[status] || "text-dark";
}

export function getStatusName(status){
    return StatusServiceEnum[status];
}