const formattedDate = (createdAt: string) => new Date(createdAt).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
});

function formatDateTimeLocal(dateTimeStr: string) {
    const dateObj = new Date(dateTimeStr);

    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');

    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = dateObj.getFullYear();

    return `${hours}:${minutes}, Ngày ${day}-${month}-${year}`;
}
function formatDateLocal(dateTimeStr: string) {
    const dateObj = new Date(dateTimeStr);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = dateObj.getFullYear();

    return `Ngày ${day}-${month}-${year}`;
}

const createImageFileFromLocalSrc = async(localSrc: string, fileName: string = "image.png") => {
    try {
      // Fetch the local image source
        const response = await fetch(localSrc);
    
        // Convert the response to a Blob
        const blob = await response.blob();
    
        // Create a new File object from the Blob
        const file = new File([blob], fileName, { type: blob.type });
    
        return file;
    } catch (error) {
        console.error("Error creating file from local source:", error);
        return null;
    }
}

const urlToFile = async(imageUrl: string, fileName = "image.png") => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const file = new File([blob], fileName, { type: blob.type });
    return file;
}


const scrollInView = (event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, id: string) => { 
    event.stopPropagation();
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}  

export { 
    formattedDate,
    formatDateLocal,
    formatDateTimeLocal,
    createImageFileFromLocalSrc,
    urlToFile,
    scrollInView
}