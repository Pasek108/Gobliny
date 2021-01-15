'use strict';

const tablica = document.getElementById("tablica"),
    wybor_postaci = document.getElementById("wybor_postaci"),
    bohater = document.getElementsByClassName("bohater"),
    wybrana = document.getElementById("rycerz"),
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext('2d');

const screenRatio = window.innerWidth / window.innerHeight;
canvas.width = window.innerWidth;

(screenRatio < 2) ?
    canvas.height = window.innerHeight * (35 / 50) :
    canvas.height = window.innerHeight * (4 / 5);

const szerokosc = canvas.width,
    wysokosc = canvas.height;

const muzyka = new Audio("muzyka/muzyka.mp3"),
    smierc = new Audio("muzyka/smierc.mp3"),
    krzyk = new Audio("muzyka/goblin.mp3");

const tlo = new Image();
tlo.src = "obrazki/tlo.png";

const rycerz = new Image(),
    szerokosc_rycerz = szerokosc * (8 / 100),
    wysokosc_rycerz = szerokosc * (8 / 100),
    x_rycerz = szerokosc * (46 / 100);

rycerz.src = 'obrazki/Bohater6.png';
let y_rycerz = wysokosc * (64 / 100) - wysokosc_rycerz;

let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

let cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

document.getElementById("start").addEventListener('click', () => {
    wybor_postaci.style.display = "none";
    tablica.style.display = "block";
    canvas.style.display = "block";
    enter = 1;
    muzyka.play();
    interval = requestAnimationFrame(rysujSwiat);
}, true);

for (let i = 0; i < 8; i++) {
    bohater[i].addEventListener('click', () => {
        switch (i) {
            case 0:
                rycerz.src = 'obrazki/Bohater6.png';
                y_rycerz = wysokosc * (64 / 100) - wysokosc_rycerz;
                wybrana.style.backgroundImage = "url('obrazki/Bohater" + (i + 1) + ".png')";
                break;
            case 1:
                rycerz.src = 'obrazki/Bohater6.png';
                y_rycerz = wysokosc * (64 / 100) - wysokosc_rycerz;
                wybrana.style.backgroundImage = "url('obrazki/Bohater" + (i + 1) + ".png')";
                break;
            case 2:
                rycerz.src = 'obrazki/Bohater6.png';
                y_rycerz = wysokosc * (64 / 100) - wysokosc_rycerz;
                wybrana.style.backgroundImage = "url('obrazki/Bohater" + (i + 1) + ".png')";
                break;
            case 3:
                rycerz.src = 'obrazki/Bohater6.png';
                y_rycerz = wysokosc * (64 / 100) - wysokosc_rycerz;
                wybrana.style.backgroundImage = "url('obrazki/Bohater" + (i + 1) + ".png')";
                break;
            case 4:
                rycerz.src = 'obrazki/Bohater6.png';
                y_rycerz = wysokosc * (64 / 100) - wysokosc_rycerz;
                wybrana.style.backgroundImage = "url('obrazki/Bohater" + (i + 1) + ".png')";
                break;
            case 5:
                rycerz.src = 'obrazki/Bohater6.png';
                y_rycerz = wysokosc * (64 / 100) - wysokosc_rycerz;
                wybrana.style.backgroundImage = "url('obrazki/Bohater" + (i + 1) + ".png')";
                break;
            case 6:
                rycerz.src = 'obrazki/Bohater7.png';
                y_rycerz = wysokosc * (64.8 / 100) - wysokosc_rycerz;
                wybrana.style.backgroundImage = "url('obrazki/Bohater" + (i + 1) + ".png')";
                break;
            case 7:
                rycerz.src = 'obrazki/Bohater8.png';
                y_rycerz = wysokosc * (64.4 / 100) - wysokosc_rycerz;
                wybrana.style.backgroundImage = "url('obrazki/Bohater" + (i + 1) + ".png')";
                break;
        }
    }, true);
}

const goblin = new Image();
goblin.src = 'obrazki/Goblin.png';

const szerokosc_goblin = szerokosc * (45 / 1000),
    wysokosc_goblin = szerokosc * (52 / 1000),
    odl_kroku = szerokosc * (35 / 1000);

class gobliny {
    constructor(odlPodst, odlIle, strona) {
        if (strona === 0) {
            this.goblinX = -szerokosc_goblin - (odlPodst * (odlIle + 1));
            this.goblinXX = -100 - szerokosc_goblin;
            this.goblin_krok = 1;
        }
        else {
            this.goblinX = szerokosc + (odlPodst * (odlIle + 1));
            this.goblinXX = szerokosc + 100;
            this.goblin_krok = 0;
        }
        this.goblinY = wysokosc * (64 / 100) - szerokosc * (57 / 1000);
        this.smierc = new Audio("muzyka/goblin.mp3");
    }
};

let Pgoblin = [],
    Lgoblin = [],
    ktoryP = 0,
    ktoryL = 0;

window.addEventListener("click", (e) => {
    if (e.clientX < szerokosc / 2) strona = 0;
    else strona = 1;
});

document.addEventListener('keydown', klawisz, true);

let enter = 0,
    strona = 0,
    interval = undefined;

function klawisz(e) {
    if (enter === 0) {
        if (e.code === 'Enter') {
            wybor_postaci.style.display = "none";
            tablica.style.display = "block";
            canvas.style.display = "block";
            enter = 1;
            muzyka.play();
            interval = requestAnimationFrame(rysujSwiat)
        }
    }
    else {
        if (e.keyCode === 37) strona = 0;
        else if (e.keyCode === 39) strona = 1;

        if (przegrana === 1) {
            if (e.code === 'Enter') {
                window.location.reload();
            }
        }
    }
}

let rozgrzewka = 1,
    przegrana = 0,
    ileZyje = 0,
    zabitych = 0,
    fala = 1,
    odstep = szerokosc * (2 / 13),
    szybkosc = 4,
    szybkosc_jeden = szerokosc / 1366,
    szybkosc_cztery = 4 * (szerokosc / 1366),
    klatka_ataku = 0,
    czas_ataku = 0;

function rysujSwiat() {
    ctx.drawImage(tlo, 0, 0, szerokosc, wysokosc);

    ctx.drawImage(rycerz, klatka_ataku + 114 * (strona + 1), 0, 114, 100, x_rycerz, y_rycerz, szerokosc_rycerz, wysokosc_rycerz);

    if (ileZyje === 0) {
        if (zabitych > 280) szybkosc += szybkosc_jeden / 2;
        else if (zabitych > 210) szybkosc = szybkosc_cztery + 6 * szybkosc_jeden;
        else if (zabitych > 150) szybkosc = szybkosc_cztery + 5 * szybkosc_jeden;
        else if (zabitych > 100) szybkosc = szybkosc_cztery + 4 * szybkosc_jeden;
        else if (zabitych > 60) szybkosc = szybkosc_cztery + 3 * szybkosc_jeden;
        else if (zabitych > 30) szybkosc = szybkosc_cztery + 2 * szybkosc_jeden;
        else if (zabitych > 10) szybkosc = szybkosc_cztery + szybkosc_jeden;

        if (rozgrzewka === 1 && zabitych === 1) {
            rozgrzewka = 0;
            zabitych = 0;
        }

        if (zabitych >= fala * 2) {
            fala++;
            odstep -= (szerokosc * (1 / 133));
            if (odstep < (szerokosc * (13 / 133))) odstep = (szerokosc * (13 / 133));
        }

        Lgoblin = [];
        Pgoblin = [];
        ktoryL = 0;
        ktoryP = 0;

        for (let i = ileZyje; ileZyje < fala; i++) {
            let x = (Math.random() > 0.5) ? 1 : 0;
            (x === 0) ?
                Pgoblin.push(new gobliny(odstep, i, x)) :
                Lgoblin.push(new gobliny(odstep, i, x));
            ileZyje++;
        }
    }

    let Lgoblin_size = Lgoblin.length;
    for (let i = ktoryL; i < Lgoblin_size; i++) {
        ctx.drawImage(goblin, 0 + Lgoblin[i].goblin_krok * 80, 0, 80, 90, Lgoblin[i].goblinX, Lgoblin[i].goblinY, szerokosc_goblin, wysokosc_goblin);

        Lgoblin[i].goblinX -= szybkosc;
        if (Lgoblin[i].goblinX < Lgoblin[i].goblinXX - odl_kroku) {
            (Lgoblin[i].goblin_krok === 0) ?
                Lgoblin[i].goblin_krok = 1 :
                Lgoblin[i].goblin_krok = 0;

            Lgoblin[i].goblinXX -= odl_kroku;
        }

        if (Lgoblin[i].goblinX < x_rycerz + szerokosc_rycerz * (17 / 30)) {
            if (strona === 1) {
                zabitych++;
                ileZyje--;
                klatka_ataku = 114;
                czas_ataku = 6;
                Lgoblin[i].smierc.play();
                Lgoblin[i].goblinX = szerokosc * 2;
                ktoryL++;
            }
            else if (Lgoblin[i].goblinX < x_rycerz + szerokosc_rycerz * (16 / 30)) przegrana = 1;
        }
    }

    let Pgoblin_size = Pgoblin.length;
    for (let i = ktoryP; i < Pgoblin_size; i++) {
        ctx.drawImage(goblin, 160 + Pgoblin[i].goblin_krok * 80, 0, 80, 90, Pgoblin[i].goblinX, Pgoblin[i].goblinY, szerokosc_goblin, wysokosc_goblin);

        Pgoblin[i].goblinX += szybkosc;
        if (Pgoblin[i].goblinX > Pgoblin[i].goblinXX + odl_kroku) {
            (Pgoblin[i].goblin_krok === 0) ?
                Pgoblin[i].goblin_krok = 1 :
                Pgoblin[i].goblin_krok = 0;

            Pgoblin[i].goblinXX += odl_kroku;
        }

        if (Pgoblin[i].goblinX + szerokosc_goblin > x_rycerz + szerokosc_rycerz * (13 / 30)) {
            if (strona === 0) {
                zabitych++;
                ileZyje--;
                klatka_ataku = -114;
                czas_ataku = 6;
                Pgoblin[i].smierc.play();
                Pgoblin[i].goblinX = -szerokosc;
                ktoryP++;
            }
            else if (Pgoblin[i].goblinX + szerokosc_goblin > x_rycerz + szerokosc_rycerz * (14 / 30)) przegrana = 1;
        }
    }

    if (czas_ataku < 0) klatka_ataku = 0;
    czas_ataku -= szybkosc / 3.5;

    if (przegrana === 1) {
        muzyka.pause();
        smierc.play();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, szerokosc, wysokosc);
        ctx.font = "2vw Verdana";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("Nie żyjesz", canvas.width / 2, canvas.height / 5);
        ctx.fillText("Enter-restart", canvas.width / 2, (canvas.height / 5) + 50);
        cancelAnimationFrame(interval);
        return 0;
    }

    (rozgrzewka === 0) ?
        tablica.innerHTML = "Fala: " + fala + "<br>Zabite gobliny: " + zabitych :
        tablica.innerHTML = "Fala: rozgrzewkowa" + "<br>Zabite gobliny: " + zabitych;

    interval = requestAnimationFrame(rysujSwiat);
}