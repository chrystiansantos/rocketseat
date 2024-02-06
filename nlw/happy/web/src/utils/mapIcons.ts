import Leaflet from 'leaflet';
import mapMarkerImg from '../assets/images/mapMarker.svg';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  // tamanho do icone
  iconSize: [48, 58],

  iconAnchor: [24, 68],
  // irei ajustar ele no eixo x e y
  popupAnchor: [170, 2],
});

export default mapIcon;
