const request =require('request');
require('dotenv').config();

const geocode = (address, callback) => {
    //the encode function is necessary to elaborate special characters that mean something in the url structure.
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + `.json?access_token=${process.env.ACCESS_TOKEN}&limit=1`
 
    request({url: url, json: true}, (error, {body}) => {
      if(error) {
         callback('Unable to connect to location services!', undefined)
      } else if (body.features.length === 0) {
         callback('Unable to find location. Try another search.', undefined)
      } else {
          //the error won't return a value. 
        callback(undefined, {
             latitude : body.features[0].center[1],
             longitude :body.features[0].center[0],
             location: body.features[0].place_name
        })
      }
    })
 }

 module.exports =  geocode
    