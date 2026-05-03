
const templates = new Map();

// returns a clone of a template or undefined if template does not exist
export function getTemplate(templateID) {

    if (!templates.get(templateID)) {
        const templateNode = document.querySelector(templateID);
        if (!templateNode) {
            return undefined;
        }
        templates.set(templateID,  templateNode);
    }
    return document.importNode(templates.get(templateID).content, true);
}

// deletes template from memory
export function deleteTemplate(templateID) {
    if (templates.get(templateID)) {
        delete templates.delete(templateID);
    }
}

// deletes template from memory
export function clearAllTemplates() {
    delete templates.clear();
}
