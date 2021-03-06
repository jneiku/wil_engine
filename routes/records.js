var express = require('express')
var wil_engine = require('../wil_engine')
var _ = require('lodash')
var router = express.Router()

router.get('/:location', function(req, res, next) {
  var location = req.params.location
  var cb = function(data){
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    var records = []
    data = data[0]
    if (!data){
      return false
    }
    _.each(months, function(n, i){
      var record = {
        month: n,
        temperature: data.temp[i],
        precipitation: data.precip[i]
      }
      records.push(record)
    })

    res.render('records', { location: location, coords: data.loc.coordinates, records: records })
  }
  wil_engine(location, cb)

})

module.exports = router
