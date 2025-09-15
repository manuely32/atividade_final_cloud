import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
require('dotenv').config()


export async function aws(fileName, imageBuffer, mimeType) {

    const s3 = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
    })

    const uploadParams = {
        Bucket: process.env.AWS_BUCKET,
        Key: fileName,
        Body: imageBuffer,
        ContentType: mimeType
    }

    try {
        await s3.send(new PutObjectCommand(uploadParams))

        const url = `https://talentcloud.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`

        return url

    } catch (error) {
        console.log('error', error)
        throw new Error('Erro ao salvar a imagem')
    }

}
