import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Validate environment variables
if (!process.env.CLOUD_NAME || !process.env.API_KEY || !process.env.API_SECRET) {
    throw new Error('Missing required Cloudinary configuration');
}

// Configure Cloudinary once at startup
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Please upload a file!" });
        }

        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "auto",
                    // folder: "uploads",
                    // use_filename: true,
                    // unique_filename: true
                },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary Upload Error:", error);
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );

            uploadStream.end(req.file.buffer);
        });

        res.status(200).json({
            url: result.secure_url,
            public_id: result.public_id
        });

    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ error: "Something went wrong", details: error.message });
    }
};

export default uploadFile;