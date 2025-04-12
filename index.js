const functions = require('@google-cloud/functions-framework');
const { Storage } = require('@google-cloud/storage');
const sharp = require('sharp');

// Create a storage client
const storage = new Storage();
const bucketName = 'your-bucket-name'; // Replace with your bucket name

// Cloud function to resize and upload image
functions.cloudEvent('resizeImage', async (cloudEvent) => {
    const file = cloudEvent.data;

    // Get file name and bucket details
    const fileName = file.name;
    const bucket = storage.bucket(bucketName);

    // Get the image from Cloud Storage
    const inputFile = bucket.file(fileName);
    const inputStream = inputFile.createReadStream();

    // Resize the image using sharp
    const outputStream = bucket.file(`resized-${fileName}`).createWriteStream();

    inputStream
        .pipe(sharp().resize(200)) // Resize to width 200px
        .pipe(outputStream)
        .on('finish', () => {
            console.log(`Resized image uploaded to: resized-${fileName}`);
        })
        .on('error', (err) => {
            console.error('Error processing image:', err);
        });
});

