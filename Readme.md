# Google Cloud Platform Image Uploader and Resizer

This project demonstrates how to upload images to Google Cloud Storage, resize them using a Google Cloud Function, and store the resized images back into the Cloud Storage bucket.

## Requirements
- Google Cloud Project with Cloud Functions and Cloud Storage enabled.
- Node.js environment (for local testing).
- Sharp library for image resizing.

## How to Deploy
1. Clone this repository.
2. Install dependencies:

    ```bash
    npm install
    ```

3. Deploy the function to Google Cloud:

    ```bash
    gcloud functions deploy resizeImage \
      --runtime nodejs14 \
      --trigger-resource your-bucket-name \
      --trigger-event google.storage.object.finalize
    ```

4. Upload an image to the specified Cloud Storage bucket.

5. The image will be automatically resized and uploaded as `resized-{image_name}`.

## How to Test Locally
1. Install Google Cloud SDK and authenticate:
    ```bash
    gcloud auth login
    ```

2. Run the function locally:

    ```bash
    npm start
    ```

3. Upload an image to your Cloud Storage bucket and verify the resized image.
