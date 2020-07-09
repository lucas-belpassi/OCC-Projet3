class Booking {
    constructor() {
        this.end = null;
        this.station = null;
        this.timer = null;
        this.cancel = this.cancel.bind(this);
        this.valid = this.valid.bind(this);
        this.setInfos = this.setInfos.bind(this);
        this.getInfos = this.getInfos.bind(this);
        this.sign = new Signature;
        document.getElementById("cancel-button").addEventListener('click', this.cancel); // Bouton annuler la réservation
        document.getElementById("booking-form").addEventListener('submit', this.valid);

        this.getInfos();
    }

    rebuild(end) { // recontruction de la résa
        this.timer = new Timer(end, this.cancel); // On relance le timer

        document.getElementById('booking-summary').style.display = 'block'; // On ré-affiche le résumé de la réservation;
        document.getElementById("summary-nickname-name").innerHTML = localStorage.getItem("nickname-local") + " " + localStorage.getItem("name-local") // On réaffiche les infos noms et prénom
        document.getElementById("reserved-station").innerHTML = this.station.name // On réaffiche le nom de la station réservée
        document.getElementById("choose-station").innerHTML = "Cliquez sur une station pour effectuer une nouvelle réservation" // On propose une nouvelle réservation

    }

    valid(e) { // Vérifie si le formulaire est bien rempli, lance le timer, stocke les informations et les affiche dans le récap en front
        e.preventDefault(); // annuler le rafraichissement de la page quand on clique sur Reserver
        
        // Si formulaire bien rempli :
        if (document.getElementById('name').value.trim() !== "" && document.getElementById('nickname').value.trim() !== "" && this.sign.signed == true){
            this.setInfos(); // On stocke les infos dans le local storage

            let end = Date.now() + 20 * 60 * 1000; // Date de fin

            sessionStorage.setItem("end", end); // On stocke this end dans le session storage
            sessionStorage.setItem("station", this.station.number); // On stocke le nombre de la station dans le session storage

            document.getElementById('booking-summary').style.display = 'block'; // On affiche le résumé de la réservation;

            document.getElementById("summary-nickname-name").innerHTML = localStorage.getItem("nickname-local") + " " + localStorage.getItem("name-local") // On affiche le nom et le prénom dans le récap
            document.getElementById("reserved-station").innerHTML = this.station.name // On affiche aussi la station dans le récap

            // Si il y'avait déja un timer :
            if (this.timer != null) {
                this.timer.stop(); // On le stoppe
            }

            this.timer = new Timer(end, this.cancel); // On lance le timer
        }
        return false
    }

    cancel() { // Fin de réservation, supprime le timer et vide le cache
        sessionStorage.clear(); // On vide le session storage

        document.getElementById("summary-nickname-name").innerHTML = ""; // Recap nom et prenom repasse à "vide"
        document.getElementById("reserved-station").innerHTML = ""; // Recap station repasse à "vide"
        document.getElementById('booking-summary').style.display = 'none'; // On enlève le résumé de la résa

        // A CHECKER 
        document.getElementById('choose-station').style.display = "block"; // On ré affiche le message de choix de la station
        this.station.supressDetails();

        this.timer.stop(); // On stoppe le timer
    }

    setInfos() { // Méthode pour rentrer les infos dans le local storage
        localStorage.setItem('name-local', document.getElementById('name').value);
        localStorage.setItem('nickname-local', document.getElementById('nickname').value);
    }

    getInfos() { // Si infos dans le local Storage on les récupère pour préremplir le formulaire
        document.getElementById("name").value = localStorage.getItem("name-local"); // Le nom
        document.getElementById("nickname").value = localStorage.getItem("nickname-local"); // Le prénom
    }
}