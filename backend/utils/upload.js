import multer from "multer";
import path from "path";

// Configure Multer storage
const storage = multer.memoryStorage(); // Store image in memory as buffer

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png/;
        const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = allowedTypes.test(file.mimetype);

        if (extName && mimeType) {
            return cb(null, true);
        } else {
            return cb(new Error("Only JPEG, JPG, and PNG files are allowed"));
        }
    }
});

export default upload;
