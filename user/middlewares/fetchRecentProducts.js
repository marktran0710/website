const fetch = require('node-fetch');

const fetchRecentProducts = async () => {
    await fetch(`${process.env.PYTHON_URI || process.env.PYTHON_LOCALHOST}/recommend`)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            return [];
        });

}

module.exports = fetchRecentProducts