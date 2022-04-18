import { Image } from '../types/image';
import { storage } from '../libs/firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

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