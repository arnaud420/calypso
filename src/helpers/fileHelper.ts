import firebase from '../firebase';

/**
 * Generate a unique string.
 */
export const getUniqueFilename = (): string => (
  new Date().getTime().toString() + Math.random().toString().replace('.', '')
)

/**
 * Get Blob from image path.
 *
 * @param file
 */
export const getFileBlob = async (file: string): Promise<Blob> => {
  const fetchedImage = await fetch(file);
  return fetchedImage.blob();
}

/**
 * Upload a file to Firebase storage.
 *
 * @param image
 *   The local image path
 * @param pathToUpload
 *   The directory on firebase where to upload file.
 */
export const uploadFile = async (image: string, pathToUpload: string): Promise<string> => {
  const blob = await getFileBlob(image);

  return new Promise((resolve, reject) => {
    const uploadTask = firebase
      .storage?.ref(`${pathToUpload}${getUniqueFilename()}`)
      .put(blob);

    uploadTask?.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused'); break;
          case 'running':
            console.log('Upload is running'); break;
          default:
            break;
        }
      }, (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        // @ts-ignore
        switch (error.code) {
          case 'storage/unauthorized':
            reject(new Error('User doesn\'t have permission to access the object')); break;
          case 'storage/canceled':
            reject(new Error('User canceled the upload')); break;
          case 'storage/unknown':
            reject(new Error('Unknown error occurred, inspect error.serverResponse')); break;
          default:
            reject(new Error('An error occurred')); break;
        }
      }, async () => {
        const url = await uploadTask.snapshot.ref.getDownloadURL();
        resolve(url);
      })
  })
};
