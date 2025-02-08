import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const BRANCH = "main";

const uploadToGitHub = async (imageBuffer, fileName) => {
    try {
        const imageBase64 = imageBuffer.toString("base64");

        const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${fileName}`;

        const response = await axios.put(
            url,
            {
                message: `Upload ${fileName}`,
                content: imageBase64,
                branch: BRANCH
            },
            {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`,
                    Accept: "application/vnd.github.v3+json"
                }
            }
        );

        return response.data.content.download_url; // GitHub image URL
    } catch (error) {
        console.error("❌ GitHub Upload Error:", error.response?.data || error.message);
        throw new Error("Failed to upload image to GitHub");
    }
};

export default uploadToGitHub;
