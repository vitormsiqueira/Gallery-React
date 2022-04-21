import * as C from './App.styles';
import * as Images from './services/images';
import { useState, useEffect, FormEvent } from 'react';
import { Image } from './types/image';
import { ImageItem } from './components/ImageItem';
import AddIcon from './assets/images/add-icon.png';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<Image[]>([]);

  useEffect(()=>{
    const getImages = async () => {
      setLoading(true);
      let images = await Images.getAll();
      setImages(images);
      setLoading(false);
    }
    getImages();
  }, [])

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    // Não envia o form
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get('image') as File; // Explicita que é do tipo File

    if(file && file.size > 0){

    }
  }

  return (
    <C.Container>
    <C.Area>
      <C.Header>Galeria de Imagens</C.Header>

      {/* Área de Upload */}
      {/* <C.UploadForm method="POST" onSubmit={handleSubmitForm}>
        <input type="file" name="image" />
        <input type="submit" value="Enviar" />
      </C.UploadForm> */}

      {/* Listagem de Imagens */}
      {loading && 
        <C.Loading>
          <div>⌛ Carregando...</div>
        </C.Loading>
      }

      {!loading && images.length === 0 &&
        <C.Loading>
        <div>☹️ Não há imagens salvas</div>
      </C.Loading>
      }

      {!loading && images.length > 0 &&
        <C.Grid>
            <C.Card>
              <C.UploadForm method="POST" onSubmit={handleSubmitForm}>
                <C.AreaAddFile>
                  <label htmlFor='selecao-arquivo'>
                  <C.AddFile>
                    <img src={AddIcon}/>
                    <p>Adicione um arquivo</p>
                  </C.AddFile>
                  </label>
                  <input type="file" name="image" id='selecao-arquivo'/>

                </C.AreaAddFile>
                {/* <input type="submit" value="Enviar" /> */}
              </C.UploadForm>
            </C.Card>
            {images.map((item, index)=>(
              <ImageItem key={index} url={item.url} name={item.name} />
            ))}
        </C.Grid>
        
      }
    </C.Area>
    </C.Container>

  );
}

export default App;