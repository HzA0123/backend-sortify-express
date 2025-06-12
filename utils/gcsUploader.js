// utils/gcsUploader.js
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const uuid = require("uuid").v4;

// Inisialisasi client
const storage = new Storage({
  projectId: "sortify-id",
  keyFilename: "sortify-id-credential.json", // Path ke file service account credentials
});

const bucketName = "sortify-bucket"; // Ganti dengan nama bucket kamu
const bucket = storage.bucket(bucketName);

const uploadToGCS = async (file) => {
  return new Promise((resolve, reject) => {
    const blobName = `${uuid()}${path.extname(file.originalname)}`;
    const blob = bucket.file(blobName);
    const stream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
    });

    stream.on("error", (err) => reject(err));
    stream.on("finish", async () => {
      try {
        const [signedUrl] = await blob.getSignedUrl({
          action: "read",
          expires: Date.now() + 60 * 60 * 1000, // URL aktif 1 jam
        });

        resolve({ publicUrl: signedUrl, filename: blob.name });
      } catch (err) {
        reject(err);
      }
    });

    stream.end(file.buffer);
  });
};

module.exports = uploadToGCS;
