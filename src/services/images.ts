import { Image } from '../types/image';
import { storage } from '../libs/firebase';
import { ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage';
import { v4 as createID } from 'uuid';

// Retorna uma lista de Imagens salvas no Firebase
export const getAll = async () => {
    let list: Image[] = [];

    // Acessa a pasta 'images' onde está guardado as imagens
    const imagesFolder = ref(storage, 'images');
    const imageList = await listAll(imagesFolder);

    // Laço para montagem da lista de imagens
    for(let i in imageList.items){
        let imageUrl = await getDownloadURL(imageList.items[i]);

        list.push({
            name: imageList.items[i].name, 
            url: imageUrl
        })
    }

    return list;
}


export const insert = async (file: File) => {
    if(['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {

        let randomName = createID();
        let newFile = ref(storage, `images/${randomName}`)

        let upload = await uploadBytes(newFile, file);
        let imageurl = await getDownloadURL(upload.ref);
        
        return {
            name: upload.ref.name,
            url: imageurl
        } as Image;
        
    } else {
        return new Error('Tipo de arquivo não permitido');
    }
}
