'use strict'

const Image     = use('App/Models/Image')
const Property  = use('App/Models/Property')
const Helpers   = use('Helpers')

class ImageController {

    async store({ params, request }){
        const property = await Property.findOrFail(params.id)

        const images = request.file('image', {
            types: ['image'],
            size: '2mb'
        })

        await images.moveAll(Helpers.tmpPath('uploads'), file => ({
            name: `${Data.now()}-${file.clientName}`
        }))

        if(!images.moveAll()){
            return images.errors()
        }
    }
}

module.exports = ImageController
