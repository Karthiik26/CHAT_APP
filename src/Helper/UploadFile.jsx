const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`;

const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'chat-app-file');

    const res = await fetch(url, {
        method: 'POST',
        body: formData
    });
    const response = await res.json()

    return response;
};

export default uploadFile;
