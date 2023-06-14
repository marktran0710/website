require('dotenv').config();

const { google } = require('googleapis');
const fs = require('fs');

// Replace with your Google API credentials
const credentials = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uris: process.env.REDIRECT_URI,
    access_token: process.env.ACCESS_TOKEN,
    refresh_token: process.env.REFRESH_TOKEN,
    scope: 'https://www.googleapis.com/auth/drive',
};

// Create an OAuth2 client using the credentials
const oauth2Client = new google.auth.OAuth2(
    credentials.client_id,
    credentials.client_secret,
    credentials.redirect_uris
);
oauth2Client.setCredentials({
    access_token: credentials.access_token,
    refresh_token: credentials.refresh_token,
});

oauth2Client.generateAuthUrl({
    access_type: 'offline'
});

// Create a new Drive API client using the OAuth2 client
const drive = google.drive({ version: 'v3', auth: oauth2Client });

// Define the folder ID where you want to upload the files
const folderId = '15jefe4x5u8cHA8M0ekcibMtFcdoveNZK';

async function uploadImageToDrive(filePath, file) {
    const fileMetadata = {
        name: file,
        parents: [folderId]
    };

    const media = {
        mimeType: 'image/jpg',
        body: fs.createReadStream(filePath)
    };

    try {
        const res = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id'
        });

        return res.data.id;
    } catch (error) {
        console.error(`Error uploading file: ${file} (${error})`);
    }
}

module.exports = uploadImageToDrive