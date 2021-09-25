import cloudinary from 'cloudinary';
import {fileUpload} from "../../helpers/fileUpload";

cloudinary.config({
    cloud_name: 'ariannode',
    api_key: '974663459862787',
    api_secret: 'iZlLP866j7AvId00R1AmcU2NHhY',
    secure: true
});

describe('Pruebas en fileUpload', () => {
    test('Debe de cargar un archivo y retornar el URL', async () => {
        const resp = await fetch('https://19yw4b240vb03ws8qm25h366-wpengine.netdna-ssl.com/wp-content/uploads/10-Free-To-Use-CORS-Proxies-1024x768.png');
        const blob = await resp.blob();

        const file = new File([blob], 'img.png');
        const url = await fileUpload(file);

        expect(typeof url).toBe('string');

        // Borrar imagen por ID
        const segments = url.split('/');
        const imgId = segments[segments.length - 1].replace('.png', '');
        // console.log(imgId);

        await cloudinary.v2.api.delete_resources(imgId);
    });

    test('Debe de retornar un error', async () => {

        const file = new File([], 'img.jpg');
        const url = await fileUpload(file);

        expect(url).toBe(null);
    });
})