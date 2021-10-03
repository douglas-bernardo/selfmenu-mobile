import React, { useCallback } from 'react';

import { StatusBar } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { BarCodeReadEvent, RNCamera } from 'react-native-camera';

import api from '../../services/api';

import Button from '../../components/Button';

import { Title } from './styles';

const QRCode: React.FC = () => {
  const handleQRCodeScanner = useCallback((e: BarCodeReadEvent) => {
    api
      .get('/app/restaurants/3a6b27b0-2057-409c-bf10-ac2ae4cdb983')
      .then(response => {
        console.log(response.data);
      });
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#E5E9F2" />
      <QRCodeScanner
        onRead={handleQRCodeScanner}
        cameraProps={{ flashMode: RNCamera.Constants.FlashMode.auto }}
        cameraStyle={{ width: '100%' }}
        containerStyle={{
          paddingLeft: 10,
          paddingRight: 10,
          backgroundColor: '#E5E9F2',
        }}
        showMarker
        fadeIn
        topContent={<Title>Escaneie o QRCode para ter acesso ao menu</Title>}
        topViewStyle={{
          alignSelf: 'center',
        }}
        bottomViewStyle={{
          width: '100%',
        }}
        bottomContent={
          <Button
            title="Go to Details"
            onPress={() => {
              console.log('Test');
            }}
          />
        }
      />
    </>
  );
};

export default QRCode;
