export default {
    destination: process.env.NODE_ENV === 'production' ?
        'https://notes-app-jlz.azurewebsites.net/notes' :
        '/notes'
}