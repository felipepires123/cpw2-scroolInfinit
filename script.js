
window.addEventListener('load', function() {
    carregaimagens().then(function(response) {
        let imagens = JSON.parse(response)    

        function insereElementoIMG(id) {
            document.getElementById(id).appendChild(criaElementoIMG(imagens[(Math.floor(Math.random()*15))].url))
        }
    
        function criaElementoIMG(url) {
            let img = document.createElement("img")
            img.src = url
            return img
        }
        
        for (let i = 0; i < 10; i++) {
            insereElementoIMG("container")
        }
    
        window.addEventListener("scroll", function() {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                insereElementoIMG("container")
            }
        })
    })
})

function carregaimagens() {
    return new Promise((resolve, reject) => {
        let xml = new XMLHttpRequest()
        xml.open("GET", "http://127.0.0.1:5500/data.json", true);
        xml.setRequestHeader("content-type","aplication/json");
        xml.onload = function (){
            if (xml.status === 200) {
                resolve(xml.response)
            } else {
                reject(Error)
            }
        }
        xml.onerror = function() {
        reject(Error('OPS, algo deu errado ao processar'))
        }
        xml.send()
    })
}