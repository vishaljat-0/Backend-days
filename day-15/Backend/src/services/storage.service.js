const ImageKit = require("@imagekit/nodejs").default;
 const upload = require("../middleware/upload.middleware");



 const client= new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
 })



 const uploadfile= async ({buffer, fileName,folder=""}) => {
    const file= await client.files.upload({
        file:await ImageKit.toFile(Buffer.from(buffer)),
        fileName:fileName,
        folder


    })
    return file;



 }

 module.exports = { uploadfile };