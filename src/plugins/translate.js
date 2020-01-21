import googleTranslate from 'google-translate';

 export const t = (txt)=>{
      return new Promise((resolve, reject) => {
        googleTranslate('AIzaSyBHt947aSFRXbo1wgQGxmam9iRB7wHNkco').translate(txt, 'pt', (err, translation) => {
          err 
              ? (reject(err), logger.log('error', err))
              : resolve(translation.translatedText)
          });
      });
    }
export const falar = (text)=>{
      TTS.speak({
            text: text,
            locale: 'en-US',
            rate: 0.5
        }, function () {
        console.log('success');
      }, function (reason) {
        console.log('error', reason);
      });
    }