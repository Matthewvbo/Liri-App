const axios = require('axios')
const inquirer = require('inquirer')

inquirer.prompt([
    {
        type: 'input',
        name: 'movie',
        message: 'What is your favorite movie?'
    },
    {
    type: 'list',
    name: 'type',
    'message': 'Is it a Movie, Series, or Episode?',
    choices: ['Movie', 'Series', 'Episode']
    }
])
.then(({ title, type }) => {
    axios.get(`http://www.omdbapi.com/?t=${title}&type=${type}&
    apikey=trilogy`)
    .then(({ data }) => console.log(data))
    .catch(e => console.log(e))
})
.catch(e => console.log(e))