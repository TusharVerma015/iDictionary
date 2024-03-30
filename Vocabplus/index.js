const inp = document.getElementsByClassName("search")[0]
const searchbtn = document.getElementById("searchword")
const crosshbtn = document.getElementById("crossword")
const def = document.getElementById("def")
const syn = document.getElementById("syn")
const mainword = document.getElementById("main-word")
const defSection = document.getElementById("word")
const mainsynonym = document.getElementById("main-synonym")

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b7fefe0dfbmsh53840667d7f4825p112aa3jsneb8cfe2eb89c',
		'X-RapidAPI-Host': 'dictionary-by-api-ninjas.p.rapidapi.com'
	}
};
searchbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    fetch(`https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary?word=${inp.value}`,options)
    .then(response=>response.json())
    .then(response=>{
        if(response["definition"].length==0){
            mainword.innerText = "No such word !";
            def.innerText = "";
            syn.innerText = "";
        }
        else{
        let definitionn = "";
        let idx = 0;
        for(idx = 0;idx<response["definition"].length;idx++){
            if(response["definition"][idx]===";") break;
            definitionn+=response["definition"][idx];
        }
        definitionn = definitionn.replace("1.","")
        for(let i = idx+1;i<response["definition"].length;i++){
            if(response["definition"][i]===";") break;
            definitionn+=response["definition"][i];
            idx+=1;
        }
        let synn = "";
        let synIdx = 0;
        for(let i = 0;i<response["definition"].length;i++){
            if(response["definition"][i]=="4"){
                synIdx = i;
                break;
            }
            
        }
        for(let i = 0 ;i<response["definition"].length;i++){
            if(response["definition"][i]=="5") break;
            synn+=response["definition"][i];
        }
        
        mainword.innerText = response["word"];
        def.innerText = definitionn;
        syn.innerText = synn;
        }
    })
    .catch(error=>console.log(error))
   
})
crosshbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    inp.value = ""

})