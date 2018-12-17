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
    }
}

module.exports = ImageController
