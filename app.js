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
		interval = setInterval(retirerSeconde, 1000);
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
	}

	// On stresse beaucoup quand il reste 15 secondes
	if (secondes === 15) {
		couleurBarre = "red";
	}

	// On revient au début quand le chrono arrive à 0
	if (secondes === 0) {
		revenirDebut();
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


// Quand on clique sur un joueur, sa carte se retourne
document.body.onclick = function(e) {
	e = e.target;

	if (e.className && e.className.indexOf("joueurn") != -1) {
		e.classList.add("retourne");
	}
};
