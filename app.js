///////////////////////////////////////////////////////////////////////
// Tableau des joueurs : 

let participants = ["Anthony", "Audrey", "Baptiste", "Carole", "Cécile", "Claire", "Elodie",
"Fred", "Marie-Laure", "Marveen", "Morgane", "Patern", "Timothée", "Vincent", "Yoan"]
console.log(participants);

//////////////////////////////////////////////////////////////////////
// Chrono + Jauge :

function id(el) {
    return document.getElementById(el);
}

let secondes = 300;
let secondesFormate;
let minutesFormate;
let interval;
let caTourne = false;
let couleurBarre = "green";

// Bouton "Lancer"
id("lancer").addEventListener("click", function() {
	if (caTourne === false) {
		caTourne = true;
		interval = setInterval(retirerSeconde, 20);
	}
});

// Bouton "Pause"
id("pause").addEventListener("click", function() {
	caTourne = false;
	clearInterval(interval);
});

// Bouton "Stop"
id("stop").addEventListener("click", function() {
	caTourne = false;
	clearInterval(interval);
	revenirDebut();
});

function retirerSeconde() {
	secondes--;
	let pourcentage = (100 * secondes) / 300;

	// On commence à stresser quand il reste 60 secondes
	if (secondes === 60) {
        couleurBarre = "darkorange";
        tirageAleatoire_3();
	}

	// On stresse beaucoup quand il reste 15 secondes
	if (secondes === 15) {
		couleurBarre = "red";
	}

	// On revient au début quand le chrono arrive à 0
	if (secondes === 0) {
        revenirDebut();
        document.getElementById("uke").lastChild.textContent = document.getElementById("tori").firstChild.textContent;
        console.log(tori)
        console.log(uke)
        document.getElementById("tori").lastChild.textContent = (document.getElementById("suivant").firstChild.textContent);
        document.getElementById("suivant").innerHTML = " ? ".bold();
	}

	// On met à jour l'apparence de la barre de progression à chaque seconde
	id("prog").setAttribute(
		"style",
		`width: ${pourcentage}%;background: ${couleurBarre};`
	);

	// On gère le formatage des minutes et des secondes
	secondesFormate = secondes % 60;
	minutesFormate = Math.floor(secondes / 60);
	id("compteur").innerHTML = `${minutesFormate}:${("0" + secondesFormate)
		.toString()
		.slice(-2)}`;
}

function revenirDebut() {
	secondes = 300;
	couleurBarre = "green";
	secondesFormate = secondes % 60;
	minutesFormate = Math.floor(secondes / 60);
	id("compteur").innerHTML = `${minutesFormate}:${("0" + secondesFormate)
		.toString()
		.slice(-2)}`;
	id("prog").setAttribute("style", `width: 100%;background: green`);
}

///////////////////////////////////////////////////////////////
// Premier Tirage : 

function ukeTori() {
    tirageAleatoire_1();
    tirageAleatoire_2();
    //tirageAleatoire_3();
}

function tirageAleatoire_1() {
    function aleatoire_1() {
        var max = Math.floor(participants.length)
        return Math.floor(Math.random() * max);
    };
    function eliminer() {
        let degage = aleatoire_1()
        console.log(degage);
        let partis = participants.splice(degage, 1);
        console.log(partis);
        if (partis.length) {
            document.getElementById(partis).innerHTML = partis;
            document.getElementById("uke").innerHTML = partis;
            document.getElementById(partis).classList.add("retourne");
        } else {
            document.getElementById(participants).innerHTML = partis;
            document.getElementById("uke").innerHTML = partis;
            document.getElementById(participants).classList.add("retourne");
            console.log(document.getElementById("uke").lastChild);
        }
    };
    eliminer();
    console.log(uke);
    console.log(participants);
}
function tirageAleatoire_2() {
    function aleatoire_2() {
        var max = Math.floor(participants.length)
        return Math.floor(Math.random() * max);
    };
    function eliminer() {
        let degage = aleatoire_2()
        console.log(degage);
        let partis = participants.splice(degage, 1);
        console.log(partis);
        if (partis.length) {
            document.getElementById(partis).innerHTML = partis;
            document.getElementById("tori").innerHTML = partis;
            document.getElementById(partis).classList.add("retourne");
        } else {
            document.getElementById(participants).innerHTML = partis;
            document.getElementById("tori").innerHTML = partis;
            document.getElementById(participants).classList.add("retourne");
        }
    };
    eliminer();
    console.log(tori);
    console.log(participants);
}
function tirageAleatoire_3() {
    function aleatoire_3() {
        var max = Math.floor(participants.length)
        return Math.floor(Math.random() * max);
    };
    function eliminer() {
        let degage = aleatoire_3()
        console.log(degage);
        let partis = participants.splice(degage, 1);
        console.log(partis);
        if (partis.length) {
            document.getElementById(partis).innerHTML = partis;
            document.getElementById("suivant").innerHTML = partis;
            document.getElementById(partis).classList.add("retourne");
        } else {
            document.getElementById(participants).innerHTML = partis;
            document.getElementById("suivant").innerHTML = partis;
            document.getElementById(participants).classList.add("retourne");
        }
    };
    eliminer();
    console.log(suivant);
    console.log(participants);
}

// Tirage aléatoire :


function tirageAleatoire() {
    function aleatoire() {
        var max = Math.floor(participants.length)
        return Math.floor(Math.random() * max);
    };

    function eliminer() {
        let degage = aleatoire()
        console.log(degage);
        let partis = participants.splice(degage, 1);
        console.log(partis);
        if (partis.length) {
            document.getElementById(partis).innerHTML = partis;
            document.getElementById(partis).classList.add("retourne");
        } else {
            document.getElementById(participants).innerHTML = partis;
            document.getElementById(participants).classList.add("retourne");
        }
    };
    eliminer();
    console.log(participants);
}

// Sortir les absents du jour :

$(".joueurn").click(function() {
    $(this).addClass("retourne");
    participants.splice(participants.indexOf(this.id), 1);
    //console.log(this.id);
    console.log(participants);
})

// TORI ==> UKE && Suivant ==> Tori :

/*
document.getElementById("uke").innerHTML = ("tori");
document.getElementById("tori").innerHTML = ("suivant");
*/

/*
id("uke").addEventListener(revenirDebut()), function() {
    let newUke = tori.HTML;
    document.getElementById("uke").innerHTML = newUke;
}
id("tori").addEventListener(revenirDebut()), function() {
    let newTori = suivant.HTML;
    document.getElementById("tori").innerHTML = newTori;
}
*/


