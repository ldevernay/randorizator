function id(el) {
	return document.getElementById(el);
}

let secondes = 300;
let secondesFormate;
let minutesFormate;
let interval;
let caTourne = false;
let couleurBarre = "green";

id("lancer").addEventListener("click", function() {
	if (caTourne === false) {
		caTourne = true;
		interval = setInterval(retirerSeconde, 1000);
	}
});

function retirerSeconde() {
	let pourcentage = (100 * secondes) / 300;
	
	
	if (secondes === 60) {
		couleurBarre = "darkorange";
	}
	
	if (secondes === 15) {
		couleurBarre = "red";
	}
	
	if (secondes === 0) {
		secondes = 300;
		couleurBarre = "green";
	}
	
	id("prog").setAttribute("style", `width: ${pourcentage}%;background: ${couleurBarre};transition: 100ms`);

	secondes--;
	secondesFormate = secondes % 60;
	minutesFormate = Math.floor(secondes / 60);
	id("compteur").innerHTML = `${minutesFormate}:${("0" + secondesFormate)
		.toString()
		.slice(-2)}`;
}
