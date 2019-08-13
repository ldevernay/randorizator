
let participants = ["Anthony", "Audrey", "Baptiste", "Carole", "Cécile", "Claire", "Elodie",
"Fred", "Marie-Laure", "Marveen", "Morgane", "Patern", "Timothée", "Vincent", "Yoan"]
console.log(participants);

//////////////////////////////////////////////////////////////////////
//Chrono + Jauge

function id(el) {
    return document.getElementById(el);
}

let secondes = 300;
let secondesFormate;
let minutesFormate;
let interval;
let caTourne = false;
let couleurBarre = "green";

id("lancer").addEventListener("click", function () {
    if (caTourne === false) {
        caTourne = true;
        interval = setInterval(retirerSeconde, 10);
    }
});

function retirerSeconde() {
    secondes--;
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
        tirageAleatoire();
    }

    id("prog").setAttribute("style", `width: ${pourcentage}%;background: ${couleurBarre};transition: 100ms`);

    secondesFormate = secondes % 60;
    minutesFormate = Math.floor(secondes / 60);
    id("compteur").innerHTML = `${minutesFormate}:${("0" + secondesFormate)
        .toString()
        .slice(-2)}`;
}

////////////////////////////////////////////////////////////////////////////
//Tirage aleatoire + splice
/*
let participants = ["Anthony", "Audrey", "Baptiste", "Carole", "Cécile", "Claire", "Elodie",
    "Fred", "Marie-Laure", "Marveen", "Morgane", "Patern", "Timothée", "Vincent", "Yoan"]
console.log(participants);
*/
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
            document.getElementById(partis).classList.add("joueurn2");
        } else {
            document.getElementById(participants).innerHTML = partis;
            document.getElementById(participants).classList.add("joueurn2");
        }
    };
    eliminer();
    console.log(participants);
}

//Sortir les absents du jour:
$(".joueurn").click(function() {
    $(this).addClass("joueurn2");
    participants.splice(participants.indexOf(this.id), 1);
    //console.log(this.id);
    console.log(participants);
})

//tirageAleatoire();

