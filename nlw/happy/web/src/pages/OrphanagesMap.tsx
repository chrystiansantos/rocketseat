import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import mapIcon from '../utils/mapIcons';
import mapMarkerImg from '../assets/images/mapMarker.svg';

import api from '../services/api';

import '../styles/pages/OrphanagesMap.css';

interface IOrphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  // about: string;
  // instructions: string;
  // opening_hours: string;
  // open_on_weekends: boolean;
  // images: [
  // {
  // id: number;
  // url: string;
  // },
  // ];
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<IOrphanage[]>([]);

  useEffect(() => {
    async function getOrphanage() {
      const { data } = await api.get('/orphanages');
      setOrphanages(data);
    }
    getOrphanage();
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando sua visita</p>
        </header>
        <footer>
          <strong>Iguatama</strong>
          <span>Minas Gerais</span>
        </footer>
      </aside>
      <Map
        center={[-20.178485, -45.708642]}
        zoom={15}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />
        {orphanages.map((orphanage: IOrphanage) => (
          <Marker
            key={orphanage.id}
            icon={mapIcon}
            position={[orphanage.latitude, orphanage.longitude]}
          >
            <Popup
              closeButton={false}
              minWidth={240}
              maxWidth={240}
              className="map-poup"
            >
              {orphanage.name}
              <Link to={`orphanages/${orphanage.id}`}>
                <FiArrowRight size={20} color="#fff" />
              </Link>
            </Popup>
          </Marker>
        ))}
      </Map>
      <Link to="/orphanages/create" className="create-orphanate">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
};

export default OrphanagesMap;
