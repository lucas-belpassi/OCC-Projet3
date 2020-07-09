class Map {
    constructor() {
        this.booking = new Booking(); // On lance le socle pour les résa
        this.stations = [];

        this.mapFrame();
        this.overlay();
        this.informationsRetrieval();
    }


    mapFrame() {
        this.map = L.map('map-for-booking').setView([45.761139, 4.823358], 16);
    }

    overlay() {
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            accessToken: 'pk.eyJ1IjoibWFsaWxlY2hhdDEzIiwiYSI6ImNrNW50eTd4bjA3cXgzZ3M1YmU5ZmdwN2QifQ.1q5UUP4srSV0BTqslCdq3A'
        }).addTo(this.map);
    }

    informationsRetrieval() {
        var request = new XMLHttpRequest();
        var self = this;

        request.onreadystatechange = function () {
            var markers = L.markerClusterGroup();
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                var stationList = JSON.parse(this.responseText);

                for (var station of stationList) {
                    var newStation = new Station(self, station.number, station.name, station.address, station.totalStands, station.position.latitude, station.position.longitude, station.status, station.availableBikes);
                    self.stations.push(newStation);
                    markers.addLayer(newStation.marker);
                };

                if (sessionStorage.getItem("station") !== null) { // Test si résa en cours, si oui, on la réaffiche
                    let number = sessionStorage.getItem("station"); // On récupère le nombre de la station stockée dans le session storage

                    let station = self.stations.find(function (station) { // On se sert du nombre stocké pour trouver la bonne station
                        return station.number == number;
                    });
                    self.booking.station = station;
                    self.booking.rebuild(sessionStorage.getItem("end")); // On reconstruit la résa (parseInt pour être sur d'avoir un nombre et non une chaîne de caractères)
                }
            };
            self.map.addLayer(markers);
        };
        request.open("GET", "https://api.jcdecaux.com/vls/v3/stations?contract=Lyon&apiKey=181b48d8cf557a6166c0b8aa568dc6454a6c2395");
        request.send();
    }
}


