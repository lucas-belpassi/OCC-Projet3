class Station {
    constructor(map, number, name, address, totalStands, latitude, longitude, status, availableBikes) {
        this.map = map;
        this.number = number;
        this.name = name;
        this.address = address;
        this.totalStands = totalStands;
        this.latitude = latitude;
        this.longitude = longitude;
        this.status = status;
        this.availableBikes = availableBikes;
        this.marker = {};

        this.selectStation = this.selectStation.bind(this);

        this.addingMarkers();
    }

    getIcon() {  // Définition de l'icône et de sa couleur en fonction de l'état de la station
        var icon = L.icon({
            iconUrl: 'images/markers/greenmarker.png',

            iconSize: [30, 30], // size of the icon
            iconAnchor: [15, 30], // point of the icon which will correspond to marker's location
            popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
        });

        // On teste si la station est ouverte avec des places et des vélos dispos : marqueur vert
        if (this.status === "OPEN" && this.totalStands.availabilities.bikes > 0 && this.totalStands.availabilities.stands > 0) {
            icon.options.iconUrl = "images/markers/greenmarker.png";
        };
        // On teste si la station est ouverte avec des vélos dispos, mais pas d'emplacement dispos : marqueur bleu
        if (this.status === "OPEN" && this.totalStands.availabilities.bikes > 0 && this.totalStands.availabilities.stands == 0) {
            icon.options.iconUrl = "images/markers/bluemarker.png";
        };
        // On teste si la station est ouverte mais sans vélos disponibles : marqueur orange
        if (this.status === "OPEN" && this.totalStands.availabilities.bikes == 0) {
            icon.options.iconUrl = "images/markers/orangemarker.png";
        };
        // On teste si la station est fermée : marqueur rouge
        if (this.status === "CLOSED") {
            icon.options.iconUrl = "images/markers/redmarker.png";
        };
        return icon;
    }

    addingMarkers() { // Ajout du marqueur et de sa fonction associée au clic
        this.marker = L.marker([this.latitude, this.longitude], { icon: this.getIcon() }).on('click', this.selectStation);
    }

    selectStation() { // Modification au clic des marqueurs de l'encart à côté de la map 
        document.getElementById('choose-station').style.display = "none"; // Quand on clique sur un marqueur message "Veuillez cliquer sur une station" disparaît
        document.getElementById('station-details').innerHTML = "Détails de la station : " // On affiche le nom de la station
        document.getElementById('station-name').innerHTML = "Identifiant de la station : " + this.name; // On affiche le nom de la station
        document.getElementById('station-address').innerHTML = "Adresse : " + this.address; // On affiche l'adresse de la station
        document.getElementById('capacity').innerHTML = "Nombre total d'emplacements : " + this.totalStands.capacity;  // On affiche le nombre total d'emplacement de la station
        document.getElementById('available-seats').innerHTML = "Emplacements disponibles : " + this.totalStands.availabilities.stands; // On affiche les emplacements dispos de la station
        document.getElementById('bikes-available').innerHTML = "Vélos disponibles : " + this.totalStands.availabilities.bikes; // On affiche les vélos dispos dans la station

        if (this.status === "OPEN") {
            document.getElementById('station-characteristics').style.visibility = 'visible';   // Informations visibles si station ouverte
            document.getElementById('station-status').innerHTML = "Statut : Ouvert";
        } else {
            document.getElementById('station-characteristics').style.visibility = 'hidden';    // Informations cachées si station fermée
            document.getElementById('station-status').innerHTML = "Statut : Fermé";
        };

        if (this.status === "OPEN" && this.totalStands.availabilities.bikes > 0) { // Si station ouverte + vélos disponibles :
            document.getElementById('booking-form').style.visibility = 'visible';   // On affiche le formulaire de réservation 
            document.getElementById("name").value = localStorage.getItem("name-local"); // On affiche le prenom stocké dans le local Storage
            document.getElementById("nickname").value = localStorage.getItem("nickname-local"); // On affiche le prenom stocké dans le local Storage

            this.map.booking.station = this; // On précise que la propriété dans station c'est "this"
        } else {
            document.getElementById('booking-form').style.visibility = 'hidden';   // N'affiche pas le Formulaire de réservation si vélos disponibles
        };
    }

    supressDetails() { // Suppression des détails de la résa pour la méthode cancel de booking
        document.getElementById('station-details').innerHTML = "";
        document.getElementById('station-name').innerHTML = "";
        document.getElementById('station-address').innerHTML = "";
        document.getElementById('capacity').innerHTML = "";
        document.getElementById('available-seats').innerHTML = "";
        document.getElementById('bikes-available').innerHTML = "";
        document.getElementById('station-status').innerHTML = "";
    }
};
