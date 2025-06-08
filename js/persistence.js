//Guardar template:
function savePersistenceData(state, key = "templates"){
    localStorage.setItem(key, JSON.stringify(state));
}
function getPersistenceData(key = "templates"){
    const templates = localStorage.getItem(key);

    // if(templates === null){
    //     return [];
    // }else{
    //     return JSON.parse(templates);
    // }
    return templates === null ? [] : JSON.parse(templates);
}

function deletePersistenceData(){
    localStorage.clear();
}