export function SET_STORAGE_ITEM(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function GET_STORAGE_ITEM(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function REMOVE_STORAGE_ITEM(key) {
    return localStorage.removeItem(key);
}