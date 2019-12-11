import axios from 'axios';

export const animeUrl = (url, callBackAnime) => {
    axios.get("https://cors-anywhere.herokuapp.com/"+url)
      .then(res => {
        let htmlString = res.data;
        let htmlObject = document.createElement('div');
        htmlObject.innerHTML = htmlString;
        let fragment = document.createDocumentFragment(); 
        fragment.appendChild( htmlObject )
        let iframe = fragment.getElementById("subbed-ABVideo").getElementsByTagName("iframe")[0].outerHTML;
        let createIframeHtml = document.createElement('div');
        createIframeHtml.innerHTML = iframe;
        let src = createIframeHtml.firstChild.src;
        src = src.replace(window.location.origin, "")
        callBackAnime(src);
      })
      .catch(err =>{
          console.log(err);
      })
}

