import * as C from './App.styles';
import * as Images from './services/images';
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Image } from './types/image';
import { ImageItem } from './components/ImageItem';
import AddIcon from './assets/images/add-icon.png';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [loadImage, setLoadImage] = useState(false);
  const [uploding, setUploading] = useState(false);

  useEffect(()=>{
    const getImages = async () => {
      setLoading(true);
      let images = await Images.getAll();
      setImages(images);
      setLoading(false);
    }
    getImages();
  }, [])

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    // Não envia o form
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get('image') as File; // Explicita que é do tipo File

    if(file && file.size > 0){
      setUploading(true);
      let result = await Images.insert(file);
      setUploading(false);

      if(result instanceof Error){
        alert(`${result.name} - ${result.message}`)
      } else {
        let newImageList = [...images];
        newImageList.push(result);
        setImages(newImageList);
      }
    }
  }

  const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    setLoadImage(false);
    let nameFile = setSelectedImage(e.target.files![0].name);
    setLoadImage(true);
  }


  return (
    <C.Container>
    <C.Area>
      <C.Header>Galeria de Imagens</C.Header>
      
      {/* Listagem de Imagens */}
      {loading && 
        <C.Loading>
          <div>⌛ Carregando...</div>
        </C.Loading>
      }

      {!loading && images.length === 0 &&
        <C.Loading>
          <C.Message>☹️ Não há imagens salvas</C.Message>
        </C.Loading>
      }

      {!loading &&
        <C.Grid>
            <C.Card>
              <C.UploadForm method="POST" onSubmit={handleSubmitForm}>
                <C.AreaAddFile>
                  <label htmlFor='selecao-arquivo'>
                  <C.AddFile>
                    <img src={AddIcon}/>
                    {!loadImage && <p> Adicione um arquivo</p>}
                    {loadImage && <p>{selectedImage}</p>}

                  </C.AddFile>
                  </label>
                  <input type="file" name="image" id='selecao-arquivo' onChange={handleSelectFile}/>
                  
                </C.AreaAddFile>
                {loadImage && <input type="submit" value="Enviar" /> }
              </C.UploadForm>
            </C.Card>
            
            {!loading && images.length > 0 &&
              <div>
              {images.map((item, index)=>(
                <ImageItem key={index} url={item.url} name={item.name} />
              ))}
              </div>
            }

        </C.Grid>
        
      }
    </C.Area>
    </C.Container>

  );
}

export default App;