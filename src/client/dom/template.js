const templates = new Map();

/**
 * Returns a clone of a template or undefined if template does not exist
 * @param {string} templateID - The ID selector of the template
 * @returns {DocumentFragment|undefined} A clone of the template content or undefined
 */
export function getTemplate(templateID) {
    let templateNode = templates.get(templateID);
    
    if (!templateNode) {
        templateNode = document.querySelector(templateID);
        if (!templateNode) {
            console.warn(`Template with ID "${templateID}" not found`);
            return;
        }
        templates.set(templateID, templateNode);
    }
    
    return document.importNode(templateNode.content, true);
}

/**
 * Removes a template from memory
 * @param {string} templateID - The ID of the template to delete
 */
export function deleteTemplate(templateID) {
    templates.delete(templateID);
}

/**
 * Clears all cached templates from memory
 */
export function clearAllTemplates() {
    templates.clear();
}
