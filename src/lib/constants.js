// export const API_DOMAIN = "https://api.dokopi.com"
// export const API_DOMAIN = "http://localhost:4000";

export const API_DOMAIN = process.env.NODE_ENV === "development" ? "http://localhost:4000" : "https://api.dokopi.com"
export const Day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export const KnownMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]