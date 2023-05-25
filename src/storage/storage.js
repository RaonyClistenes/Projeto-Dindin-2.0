export function setItem(key, value) {
    localStorage.setItem(key, value)
}
export function getItem(key) {
    const item = localStorage.getItem(key)
    return item
}
export function removeItem(key) {
    localStorage.removeItem(key)
}
export function clear() {
    localStorage.clear()
}