const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-02/v1/currencies";

const dropmenus=document.querySelectorAll(".dropdown select" );
const btn=document.querySelector("button");
const msg=document.querySelector("msg");

const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
for(let select of dropmenus){
    for(let currCode in countryList ){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        select.append(newOption);
    }
    select.addEventListener("change",(event)=>{
         updateFlag(event.target); 
    })
}

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click",async (evt)=>{
 evt.preventDefault();
 let amount=document.querySelector(".amount input");
 let amountVal=amount.value;
 if(amountVal===""||amountVal<1){
    amountVal=1;
    amount.value="1";
 }

   const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
   let response=await fetch(URL);
  
   let data=await response.json();
   let rate=data[toCurr.value.toLowerCase()];
   let finalAmount=rate*amountVal;
   msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
})