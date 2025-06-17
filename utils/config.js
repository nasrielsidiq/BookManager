const url = "http://localhost:8000/api/"

export const ENDPOINTS = {
    BOOKS: `${url}books/`,
    LOGIN: `${url}login/`,
    REGISTER: `${url}register/`,
    COOKIES: `http://localhost:8000/sanctum/csrf-cookie/`,
}
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).replace(/:\d{2}$/, ''); // Menghilangkan detik
};