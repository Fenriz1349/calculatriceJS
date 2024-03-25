//création des variables pour stocker tous les nombres saisis et le calcul en entier
let nombres =[];
let operations=[];
let calcul="";
let temp="";
const listeNumeriques=[0,1,2,3,4,5,6,7,8,9,"."];
const listeOperations ={"multiplier" :"*",
                        "diviser":"/",
                        "additionner":"+",
                        "soustraire" :"-",
                        "supprimer": "c",
                        "effacer": "eff",
                        "egale":"=",
                        "parenthese-ouverte":"(",
                        "parenthese-ferme":")"};

export function genererBoutonChiffres(liste){
    const clavier=document.querySelector(".clavier-grid");
    for(let i of liste){
        const bouton = document.createElement("button");
        bouton.id= i=="."? 'bouton-virgule' :`bouton-${i}`;
        bouton.className="boutonNumerique";
        bouton.value=String(i);
        bouton.innerText=i=="."? ",": liste[i];
        bouton.addEventListener("click", function(){
            temp+=bouton.value;
            calcul+=bouton.value;
            afficherCalcul(calcul);

         })
        clavier.appendChild(bouton);
    }
}
export function genererBoutonOperation(liste){
    const clavier=document.querySelector(".clavier-grid");
    for(let i in liste){
        const operateur=liste[i];
        const bouton = document.createElement("button");
        bouton.id=`bouton-${i}`;
        bouton.className= operateur==="=" ?"boutonEgale": "boutonOperation";
        bouton.innerText= operateur==="*"? "x":liste[i];
        if (operateur==="*"||operateur==="/"||operateur==="+"||operateur==="-"){
            bouton.addEventListener("click",function(){
                nombres.push(Number(temp));
                operations.push(operateur);
                console.log(operations);
                temp="";
                calcul+= i=="multiplier"? "x":operateur;
                afficherCalcul(calcul);
        })}else if (operateur=="c"){
            bouton.addEventListener("click", function(){
                temp = temp.slice(0, -1);
                calcul = calcul.slice(0, -1);
                afficherCalcul(calcul);
             })
        }else if (operateur=="eff"){
            bouton.addEventListener("click", function(){
                temp="";
                calcul="";
                operations=[];
                nombres=[];
                afficherCalcul(calcul);
                resultat.innerText="";
             })
        }
        clavier.appendChild(bouton);
    }
}
function afficherCalcul(calcul){
    const outputCalcul = document.getElementById("calcul");
    outputCalcul.innerText=calcul ===""? "0" :calcul;
}
function calculer(){
    const bouton=document.getElementById("bouton-egale");
    const resultat =document.getElementById("resultat");
    bouton.addEventListener("click",function(){
        nombres.push(Number(temp));
        temp="";
        afficherCalcul(calcul+"=");
        const listeCalculOperations=["*","/","+","-"];
        for(let x in operations){
            for (let i in listeCalculOperations){
                if (operations.indexOf(listeCalculOperations[i])!=-1){
                    const position =(operations.indexOf(listeCalculOperations[i]));
                    switch (i) {
                    case "0" :nombres[position]= nombres[position]*nombres[position+1];break;
                    case "1" :{if (nombres[position+1]===0){
                                    return resultat.innerText="division par 0";
                                }else{
                                     nombres[position]= nombres[position]/nombres[position+1];break;
                                }}
                    case "2" :nombres[position]= nombres[position]+nombres[position+1];break;
                    case "3" :nombres[position]= nombres[position]-nombres[position+1];break;
                }
                    nombres.splice(position+1,1);
                    operations.splice(position,1);
            }}
        }
        resultat.innerText=nombres[0];
    })
}
export function genererPaveNumerique(){
    window.addEventListener(
        "keydown",
        function (event) {
            switch (event.code) {
                case "Numpad0":
                    temp+=0;
                    calcul+=0;
                    afficherCalcul(calcul);
                    break;
                case "Numpad1":
                    temp+=1;
                    calcul+=1;
                    afficherCalcul(calcul);
                    break;
                case "Numpad2":
                    temp+=2;
                    calcul+=2;
                    afficherCalcul(calcul);
                    break;
                case "Numpad3":
                    temp+=3;
                    calcul+=3;
                    afficherCalcul(calcul);
                    break;
                case "Numpad4":
                    temp+=4;
                    calcul+=4;
                    afficherCalcul(calcul);
                    break;
                case "Numpad5":
                    temp+=5;
                    calcul+=5;
                    afficherCalcul(calcul);
                    break;
                case "Numpad6":
                    temp+=6;
                    calcul+=6;
                    afficherCalcul(calcul);
                    break;
                case "Numpad7":
                    temp+=7;
                    calcul+=7;
                    afficherCalcul(calcul);
                    break;
                case "Numpad8":
                    temp+=8;
                    calcul+=8;
                    afficherCalcul(calcul);
                    break;
                case "Numpad9":
                    temp+=9;
                    calcul+=9;
                    afficherCalcul(calcul);
                    break;
                case "NumpadDecimal":
                    temp+=",";
                    calcul+=",";
                    afficherCalcul(calcul);
                    break;
            }
        })
}
afficherCalcul(calcul);
genererBoutonChiffres(listeNumeriques);
genererBoutonOperation(listeOperations);
calculer();
genererPaveNumerique();