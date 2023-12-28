/**
 * @typedef {Object} program 
 * @property {string} program_name
 * @property {string} program_description
 * @property {number} cycle
 * @property {number} duration
 * @property {number} nbrCredit
 * @property {string|string[]} languages
 * @property {string|string[]} admission_scheme
 * @property {string} discipline_name
 * @property {string} discipline_description
 */ 
 

/**
 * @type {program}
 */

export const programModel = {
 
    program_name: null,
    cycle: null,
    duration: null,
    program_description: null,
    nbrCredit: null,
    languages: [],
    admission_scheme: [],
    discipline_name: null, 
    discipline_description: null, 

}