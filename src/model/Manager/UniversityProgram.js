
/**
 * @typedef {Object} admission_date  
 * @property {string} start_at  
 * @property {string} end_at  
 * @property {string} session_admission  
 * @property {string} updated_at  
 * @property {number} id  
 * */ 
/**
 * @typedef {Object} Program  
 * @property {Array.<admission_date>} admission_date  
 * @property {string} label  
 * @property {string} cycle  
 * 
 */

/**  
 * @typedef {Object} UniversityProgram  
 *   
 * @property {string} updated_at    
 * @property {string} logo    
 * @property {Array.<Program>} programs    
 */  
/**
 * @type {UniversityProgram}
 */

export const UniversityProgram = {
  
    updated_at : null,  
    logo : null,  
    programs : [],   

}