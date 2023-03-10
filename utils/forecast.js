const request = require('request')
require('dotenv').config();


const forecast = (latitude, longitude , callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.ACCESS_KEY}&query=`+ latitude + ',' + longitude + "&units=f"
    request({ url, json:true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)

        }else if(body.error) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' and it is currently ' + body.current.temperature + ' degres out. it feels like ' + body.current.feelslike + ' degress out.'
            )
        }
    })
}


module.exports = forecast