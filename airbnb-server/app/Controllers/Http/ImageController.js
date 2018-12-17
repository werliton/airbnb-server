'use strict'

const Image     = use('App/Models/Image')
const Property  = use('App/Models/Property')
const Helpers   = use('Helpers')

class ImageController {

    async store({ params, request }){
        const property = await Property.findOrFail(params.id)
        // Trazer um ou mais arquivos
        const images = request.file('image', {
            types: ['image'],
            size: '2mb'
        })
        // Mover TODAS imagens
        await images.moveAll(Helpers.tmpPath('uploads'), file => ({
            name: `${Data.now()}-${file.clientName}`
        }))

        if(!images.moveAll()){
            return images.errors()
        }

        // Criar registro de imagens no BD
        // percorrendo todas imagens salvas e cadastrando dentro do imóvel
        await Promise.all(
            images
                .movedList()
                .map(image => property.image().create({ path: image.fileName }))
        )
    }
}

module.exports = ImageController
