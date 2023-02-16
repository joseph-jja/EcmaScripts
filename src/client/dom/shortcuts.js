// shortcuts
export const byId = ( eleId, parent = document ) => {
    return parent.getElementById( eleId );
};

export const queryAll = ( eleId, parent = document ) => {
    return parent.querySelectorAll( eleId );
};

export const queryOne = ( eleId, parent = document ) => {
    return parent.querySelector( eleId );
};
