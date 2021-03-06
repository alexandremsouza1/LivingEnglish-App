import axios from "axios";

// API Key do Vagalume
const key = "660a4395f992ff67786584e238f501aa";

const dataRec = {}

const getLyricsById = async id => {
  const queryById = `https://api.vagalume.com.br/search.php?musid=${id}&apikey=${key}`;

  return await axios
    .get(queryById)
    .then(data => {
      const lyric = data.data.mus[0].text;

      console.log('getLyricsById', data)
    
       const imgArtist =  getImgArtistic(data.data.art.id)
      // console.log('img ad', img)
      imgArtist.then(data => { dataRec.imgArtist = data})
      data.data.art.id
      dataRec.lyric = lyric
      dataRec.artist = data.data.art.name
      dataRec.name = data.data.mus[0].name
      dataRec.urlToVagalume = data.data.mus[0].url
      
      
      console.log(dataRec)



      return dataRec;
    })
    .catch(error => {
      console.log("error_getLyricsById", error);
    });
};

export const getLyricsByPiece = async (art,mus) => {
  var result = {}
  //const queryByPiece = `https://api.vagalume.com.br/search.php?art=${art}&mus=${mus}&apikey=${key}`;
  const queryByPiece = `https://api.vagalume.com.br/search.php?apikey=${key}&art=${art}&mus=${mus}`;
  return await axios
    .get(queryByPiece)
    .then(res => {
      console.log('getLyricsByPiece', res)
      let musicId = '';
      if(res.data.mus > 0) {
        result = {'id':res.data.art.id,'orig':res.data.mus[0].text,'tran':res.data.mus[0].translate[0].text}
      } 
     
      console.log('musicId', !!musicId)
      result = {'id':res.data.art.id,'orig':res.data.mus[0].text,'tran':res.data.mus[0].translate[0].text}
      //return !!musicId ? getLyricsById(musicId) : musicId;
      result.status = "Sucess";
      return result
    })
    .catch(e => {
     return {status:'Error',message:e.message};
    });
};

// TODO testar o codigo
export const getImgArtistic = async idArt => {
  
  const queryByIdArtist = `https://api.vagalume.com.br/image.php?bandID=${idArt}&apikey=${key}`;

  return await axios
    .get(queryByIdArtist)
    .then(data => {
      console.log('queryByIdArtist',data)
      const img_url = data.data.images[0].url;      
      return img_url;
    })
    .catch(error => {
      console.log("getImgArtistic", error);
    });
};


// // Exemplo de requisição
// var artist = "3ade68b3gdb86eda3";
// var song   = 10;
// jQuery.getJSON(
//     "https://api.vagalume.com.br/image.php"
//         + "?bandID=" + artist
//         + "&limit=" + limit
//         + "&apikey={key}",
//     function (data) {
//         // URL da imagem
//         alert(data.images[0].url);
//     }
// );