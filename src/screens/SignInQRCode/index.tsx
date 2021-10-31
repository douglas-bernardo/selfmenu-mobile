import React, { useCallback, useRef, useState } from 'react';

import { StatusBar, Alert } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { BarCodeReadEvent, RNCamera } from 'react-native-camera';

import { IEstablishment, useAuth } from '../../hooks/auth';

import { Container, Title } from './styles';
import Button from '../../components/Button';
import api from '../../services/api';

export const SignInQRCode: React.FC = () => {
  const { signIn } = useAuth();
  const [establishment, setEstablishment] = useState<IEstablishment>();

  const handleQRCodeScanner = useCallback((e: BarCodeReadEvent) => {
    api
      .get<IEstablishment>(e.data)
      .then(response => {
        setEstablishment(response.data);
      })
      .catch(err => {
        console.log(err.message);
        Alert.alert('Erro na leitura do QR Code');
      });
  }, []);

  const signInEstablishment = useCallback(async () => {
    if (establishment) {
      await signIn(establishment);
    }
  }, [signIn, establishment]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#E5E9F2" />
      <Container>
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
          topContent={<Title>Aponte a câmera para o QRCode</Title>}
          topViewStyle={{
            alignSelf: 'center',
          }}
          bottomViewStyle={{
            width: '100%',
          }}
          bottomContent={
            establishment && (
              <Button onPress={signInEstablishment}>
                {`ir para ${establishment.establishment_name}`}
              </Button>
            )
          }
        />
      </Container>
    </>
  );
};
