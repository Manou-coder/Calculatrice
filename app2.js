let memoireCalculatrice = "";
let memoireAffResult = "";
let resultat = 0;

let affichageCompt = document.getElementById('compteur');
let affichageResult = document.getElementById('resultat');

// permet d'afficher un ecran à deux lignes dès le début
affichageCompt.innerHTML = "&nbsp";
affichageResult.innerHTML = "0";

// tableau des boutons
const touches = [...document.querySelectorAll(".all_buttons")];

// tableau de la valeur des boutons
const listeKeycode = touches.map((touche) => touche.value);
listeKeycode.push('Backspace', 'Enter');
// nouveau tableau sans le signe "=" pour ne pas qu'il s'affiche lors du key down
const listeKeycode2 = listeKeycode.filter(touche => (touche != "="));

// trouve le selecteur du bouton pour enclencher le css lors de la frappe du clavier
let selecteur = 0;
function trouverSelector(valeur, array){
	for(let i = 0; i < array.length; i++){
		if(valeur == array[i]){
			selecteur = array.indexOf(array[i]);
			if(selecteur == 16){
				selecteur = 0;
			} else if(selecteur == 17){
				selecteur = 16;
			};
		};
			
	};
};

// ecoute du click
addEventListener("click", (e) => {
        const valeur = e.target.value;
        calculer(valeur);
        });
// ecoute du clavier
addEventListener("keydown", (e) => {
        const valeur = e.key;
        	if(listeKeycode2.includes(valeur)){
        		calculer(valeur);
        		trouverSelector(valeur, listeKeycode2);
        		const objectJavascript = document.getElementsByClassName("all_buttons")[selecteur];
        		objectJavascript.style.borderColor = "white";
        		objectJavascript.style.fontWeight = "bold";
        		setTimeout(function() {
        			objectJavascript.removeAttribute("style");
        		}, 200);
        	}
        });

//indique quels fonctions effectuer pour chaque touche
function calculer(valeur){
	if(listeKeycode.includes(valeur)){
		switch (valeur){
			case "0":
			enregistreZero(valeur);
			break;
			case "AC":
			remmetreAZero();
			break;
			case "Backspace":
			remmetreAZero();
			break;
			case ".":
			enregistreDecimal(valeur);
			case "=":
			estEgal();
			break;
			case "Enter":
			estEgal();
			break;
			case "+":
			case "*":
			case "-":
			case "/":
			enregistreOperateur(valeur);
			break;
			default:
			enregistreValeur(valeur);
		}
	}
};

// cerveau de la calculatrice
function enregistreValeur(valeur) {
	//console.log("affichageCompt(n de chiffre dans l'écran) = 0 + " + affichageCompt.innerHTML.length)
	if(affichageCompt.innerHTML.length > 16){
		return "erreur"
	} else {
		erreur();
	affichageResult.innerHTML = "";
	memoireCalculatrice += valeur;
	//console.log("la memoire est de = " + memoireCalculatrice);
	if(memoireCalculatrice == "."){
		affichageCompt.innerHTML = "0";
		memoireAffResult = "0"
	}
	memoireAffResult += valeur;
	affichageCompt.innerHTML += valeur;
	affichageResult.innerHTML += memoireAffResult;
	}
	
};

function enregistreOperateur(operateur) {
	console.log(memoireCalculatrice)
	console.log(operateur);
	if(memoireCalculatrice == resultat){
		affichageCompt.innerHTML = resultat;
	}
	affichageResult.innerHTML = "";
	memoireAffResult = "";
	memoireCalculatrice += operateur;
	affichageCompt.innerHTML += operateur;
	affichageResult.innerHTML = operateur;
	console.log(memoireCalculatrice);
};


function enregistreDecimal(valeur){
	let deuxPoint = /\.+/;
	if(deuxPoint.test(memoireCalculatrice) === true){
		return "coucou";
	} else {
		enregistreValeur(valeur);
	}

}

function enregistreZero(valeur){
	let deuxZero = /^0/;
	if(deuxZero.test(memoireCalculatrice) === true){
		return "coucou";
	} else {
		enregistreValeur(valeur);
	}
};

function erreur(){
	if(memoireCalculatrice == resultat){
		remmetreAZero();
	}
};

function estEgal() {
	let deuxEgal = /\=/;
	console.log(eval(memoireCalculatrice))
	resultat = eval(memoireCalculatrice);
	affichageResult.innerHTML = resultat;
	memoireCalculatrice = resultat;
	memoireAffResult = resultat;			
};



function remmetreAZero() {
	memoireCalculatrice = "";
	memoireAffResult = "";
	affichageCompt.innerHTML = memoireCalculatrice;
	affichageResult.innerHTML = memoireCalculatrice;
	affichageCompt.innerHTML = "&nbsp";
	affichageResult.innerHTML = "0";
	return memoireCalculatrice;
}
