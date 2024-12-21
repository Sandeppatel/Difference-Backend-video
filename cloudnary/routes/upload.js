const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinaryConfig');

const {Readable} = require('stream');
const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream((error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                });
                // Pipe the file buffer to the Cloudinary stream upload
                // pipe , create for uploading file to cloudinary
                Readable.from(req.file.buffer).pipe(stream);
            });
        };
        const result = await streamUpload(req);
        res.json({
            message: 'Image uploaded successfully',
            url: result.secure_url,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload image' });
    }
});

module.exports = router;