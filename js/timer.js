class Timer {
    constructor(end, callback) {
        this.end = end;
        this.interval = null;
        this.callback = callback;

        this.countDown = this.countDown.bind(this);
        this.stop = this.stop.bind(this);

        this.start();
    }

    start() { // On lance le timer et on stocke la date de fin dans le session storage
        this.stop(); // On appelle l'arrêt du timer pour éviter de le lancer plusieurs fois
        this.interval = setInterval(this.countDown, 1000); // On affiche le temps restant toutes les secondes pour avoir un timer dynamique
    }

    countDown() { // Affichage du timer en calculant les minutes et les secondes restantes
        let timeLeft = this.end - Date.now();

        // Si les 20 minutes sont passées :
        if (timeLeft <= 0) {
            this.callback(); // On supprime la résa
        }

        let secondsRemaining = Math.ceil(timeLeft / 1000);
        let minutesRemaining = Math.floor(timeLeft / 1000 / 60);
        secondsRemaining = secondsRemaining % 60;

        if (secondsRemaining < 10) { // On met un 0 devant si secondes entre 1 et 9 (ergonomiquement plus jolie pour le timer)
            secondsRemaining = "0" + secondsRemaining;
        }
        if (minutesRemaining < 10) { // On met un 0 devant si minutes entre 1 et 9 (ergonomiquement plus jolie pour le timer)
            minutesRemaining = "0" + minutesRemaining;
        }

        document.getElementById("time-left").innerHTML = minutesRemaining + " minutes et " + secondsRemaining + " secondes"; // Affichage des minutes et secondes restantes
    }

    stop() { // Arrête le timer 
        if (this.interval !== null) {
            clearInterval(this.interval); // On arrête le décompte

            sessionStorage.clear(); // On vide le session storage

            document.getElementById("time-left").innerHTML = ""; // Efface le timer
        }
    }
}