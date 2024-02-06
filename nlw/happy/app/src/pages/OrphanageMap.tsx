import React, { useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import mapMarker from '../assets/images/MapMarker.png';

const OrphanageMap: React.FC = () => {
  const { navigate } = useNavigation();
  const handleNavigationToOrphanageDetail = useCallback(() => {
    navigate('OrphanageDetail');
  }, [navigate]);
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -20.1784106,
          longitude: -45.7094105,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        <Marker
          icon={mapMarker}
          coordinate={{ latitude: -20.1784106, longitude: -45.7094105 }}
        >
          <Callout
            onPress={handleNavigationToOrphanageDetail}
            style={styles.calloutContainer}
          >
            <Text style={styles.calloutTex}>Lar das meninas</Text>
          </Callout>
        </Marker>
      </MapView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>2 orfanatos encontrado</Text>
        <TouchableOpacity style={styles.createOrphanageButton}>
          <Feather name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  calloutTex: {
    color: '#0089a5',
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Nunito_700Bold',
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,
    backgroundColor: '#fff',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    // elevantion ira aplicar um sombreamento no android
    elevation: 1,
  },
  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8fa7b3',
    textAlign: 'center',
  },
  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrphanageMap;
