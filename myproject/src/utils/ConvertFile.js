import { jsPDF } from 'jspdf';


export async function ConvertFile(item) {
    const { file, options } = item;
    const {
        targetFormat,
        quality,
        width,
        height,
        grayscale,
    } = options;

    const blobUrl = URL.createObjectURL(file);
    const img = await new Promise((resolve, reject) => {
        const image = new Image();
        image.src = blobUrl
        image.onload = () => resolve(image);
        image.onerror = reject
    })

    const canvas = document.createElement("canvas")
    canvas.width = width || img.width;
    canvas.height = height || img.height;
    const ctx = canvas.getContext("2d")

    if (grayscale) {
        ctx.filter = "grayscale(100%)";
    }
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    let outBlob;

    switch (targetFormat.toLowerCase()) {
        case 'jpg':
        case 'jpeg':
            outBlob = await new Promise((res) =>
                canvas.toBlob(res, 'image/jpeg', (quality ?? 90) / 100)
            );
            break;

        case 'png':
            outBlob = await new Promise((res) =>
                canvas.toBlob(res, 'image/png')
            );
            break;

        case 'webp':
            outBlob = await new Promise((res) =>
                canvas.toBlob(res, 'image/webp', (quality ?? 90) / 100)
            );
            break;

        case 'gif':
            outBlob = await new Promise((res) =>
                canvas.toBlob(res, 'image/gif')
            );
            break;

        case 'pdf': {
            const pdf = new jsPDF({
                orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height],
            });
            const pngDataURL = canvas.toDataURL('image/png', 1);
            pdf.addImage(pngDataURL, 'PNG', 0, 0, canvas.width, canvas.height);
            outBlob = pdf.output('blob');
            break;
        }


        case 'svg': {
            const pngDataURL = canvas.toDataURL('image/png', 1);
            const svg = `<svg xmlns="http://www.w3.org/2000/svg"
             width="${canvas.width}" height="${canvas.height}">
          <image href="${pngDataURL}"
                 width="${canvas.width}" height="${canvas.height}" />
        </svg>`
            outBlob = new Blob([svg], { type: 'image/svg+xml' });
            break;
        }

        default:
            throw new Error(`Unsupported target format: ${targetFormat}`);
    }
    URL.revokeObjectURL(blobUrl);           
    return outBlob;
}

