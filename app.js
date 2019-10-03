///////////////////////////////////////////////////////////////////////
// Tableau des joueurs : 

let participants = [];

// Synthèse vocale
let synth = window.speechSynthesis;

// Appel JSON :

let html = "";

fetch("./promo.json")
  .then(data => data.json())
  .then(data => {
    // On prend tous les noms du JSON et on les push dans un tableau
    data.Promotion.forEach(x => participants.push(x.prenom));
    console.log(participants);

    data.Promotion.forEach(
      apprenant => (html += `
      <div class="joueurn" id="${apprenant.prenom}">${apprenant.prenom}
      <img class="photo" src="${apprenant.photo}" alt="Photo apprenant">
      </div>
      `)
    );

    id("joueurs").innerHTML = html;

    // Eliminer les absents :
    document.querySelectorAll(".joueurn").forEach(x =>
      x.addEventListener("click", function () {
        if (this.classList.contains("retourne") === false) {
          this.classList.add("retourne");
          this.style.background = "red";
          this.querySelector("img").style.display = "none";
          participants.splice(participants.indexOf(this.id), 1);
          //console.log(this.id);
          console.log(participants);

          fatality.load();
          fatality.play();
        }
      })
    );
  });

//////////////////////////////////////////////////////////////////////
// On charge les sons (on les a choisis exprès pour qu'ils soient le plus énervants possible)

const ting = new Audio("./sounds/ting.wav");
const buzz = new Audio("./sounds/buzz.wav");
const fatality = new Audio("./sounds/fatality.mp3");

/////////////////////////////////////////////////////////////////////////
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
id("lancer").addEventListener("click", function () {
  if (caTourne === false) {
    caTourne = true;
    interval = setInterval(retirerSeconde, 1000);
  }
});

// Bouton "Pause"
id("pause").addEventListener("click", function () {
  caTourne = false;
  clearInterval(interval);
});

// Bouton "Stop"
id("stop").addEventListener("click", function () {
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
    ting.play();
  }

  // On stresse beaucoup quand il reste 15 secondes
  if (secondes === 15) {
    couleurBarre = "red";
    id("prog").classList.add("stress");
  }

  // On revient au début quand le chrono arrive à 0
  if (secondes === 0) {
    revenirDebut();
    var tori = id("tori").firstChild.textContent;
    var uke = id("uke").firstChild.textContent;
    var suivant = id("suivant").firstChild.textContent;

    speakAuClavier(suivant);
    speakTuCommandes(tori);
    speakTuSors(uke);
    id("uke").lastChild.textContent = id("tori").firstChild.textContent;
    id("tori").lastChild.textContent = id("suivant").firstChild.textContent;
    id("suivant").innerHTML = " ? ".bold();
    buzz.play();
  }

  function speak(name) {
    var utterThis = new SpeechSynthesisUtterance("");
    synth.speak(utterThis);
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
  id("prog").classList.remove("stress");
}

///////////////////////////////////////////////////////////////
// On bloque le lancement du chrono tant qu'on n'a pas fait un premier tirage (parce que notre utilisateur est un peu limité)

id("lancer").setAttribute("disabled", "");
id("pause").setAttribute("disabled", "");
id("stop").setAttribute("disabled", "");

// Premier Tirage :

function ukeTori() {
  id("ukeTori").setAttribute("disabled", "");
  id("lancer").removeAttribute("disabled");
  id("pause").removeAttribute("disabled");
  id("stop").removeAttribute("disabled");
  tirageAleatoire_1();
  tirageAleatoire_2();
}

function tirageAleatoire_1() {
  function aleatoire_1() {
    var max = participants.length;
    return Math.floor(Math.random() * max);
  }
  function eliminer() {
    let degage = aleatoire_1();
    let partis = participants.splice(degage, 1);
    if (partis.length) {
      id(partis).innerHTML = partis;
      id("uke").innerHTML = partis;
      id(partis).classList.add("retourne");
    } else {
      id(participants).innerHTML = partis;
      id("uke").innerHTML = partis;
      id(participants).classList.add("retourne");
    }
    speakTuCommandes(partis[0]);
  }
  eliminer();
  console.log(participants);
}
function tirageAleatoire_2() {
  function aleatoire_2() {
    var max = participants.length;
    return Math.floor(Math.random() * max);
  }
  function eliminer() {
    let degage = aleatoire_2();
    let partis = participants.splice(degage, 1);
    if (partis.length) {
      id(partis).innerHTML = partis;
      id("tori").innerHTML = partis;
      id(partis).classList.add("retourne");
    } else {
      id(participants).innerHTML = partis;
      id("tori").innerHTML = partis;
      id(participants).classList.add("retourne");
    }
    console.log(partis);
    speakAuClavier(partis[0]);
  }
  eliminer();
  console.log(participants);
}
function tirageAleatoire_3() {
  function aleatoire_3() {
    var max = participants.length;
    return Math.floor(Math.random() * max);
  }
  function eliminer() {
    let degage = aleatoire_3();
    let partis = participants.splice(degage, 1);
    if (partis.length) {
      id(partis).innerHTML = partis;
      id("suivant").innerHTML = partis;
      id(partis).classList.add("retourne");
    } else {
      id(participants).innerHTML = partis;
      id("suivant").innerHTML = partis;
      id(participants).classList.add("retourne");
    }
  }
  eliminer();
  console.log(participants);
}

function speakAuClavier(name) {
  if (name) {
    var speech = new SpeechSynthesisUtterance(name + ", tu vas au clavier ");
    synth.speak(speech);
  }
}

function speakTuCommandes(name) {
  if (name) {
    var speech = new SpeechSynthesisUtterance(name + ", tu donnes les instructions");
    synth.speak(speech);
  }
}

function speakTuSors(name) {
  if (name) {
    var speech = new SpeechSynthesisUtterance(name + ", tu retournes à ta place!");
    synth.speak(speech);
  }
}