function toggleMenu() {
    var menu = document.querySelector("nav ul");
    menu.classList.toggle("active");
}
// Função de inicialização do mapa
function initMap() {
    var initialCoords = { lat: -23.550520, lng: -46.633308 };

    var map = new google.maps.Map(document.getElementById('map'), {
      center: initialCoords,
      zoom: 12
    });

    var marker = new google.maps.Marker({
      position: initialCoords,
      map: map,
      title: 'Minha Localização'
    });}
    