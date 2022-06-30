const axios = require('axios')

const handler = async (event) => {
  const {value} = event.queryStringParameters;
  const apiKey = process.env.REACT_APP_WEATHER_API;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${apiKey}`


  try {

    const {data} = await axios.get(url)
    
    return{
      statusCode: 200,
      body: JSON.stringify(data)
    }

  }  catch (error) {
    const { status, statusText, headers, data } = error.response
    return {
      statusCode: status,
      body: JSON.stringify({status, statusText, headers, data})
    }
  }
}

module.exports = { handler }
