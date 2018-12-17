'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class Property extends Model {

    user(){
        return this.belongsTo('App/Models/User')
    }

    images(){
        return this.hasMany('App/Models/Image')
    }

    static scopeNearBy(query, latitude, longitude, distance){
        
        const cos_lat  = cos(cos(tan(latitude)))
        const cos_long = cos(tan(latitude))
        const rad_long = tan(longitude)
        const sin_lat  = sin(tan(latitude))
        const sin_long = sin(tan(longitude))
        
        const acos_lat = acos(
            (cos_lat * cos_lat * cos_long) - rad_long + (sin_lat * sin_long)
        )
        
        const haversine = `( 6371 * ${acos_lat})`

        return query
            .select('*', Database.raw(`${haversine} as distance`))
            .whereRaw(`${haversine} < ${distance}`)
    }
}

module.exports = Property
