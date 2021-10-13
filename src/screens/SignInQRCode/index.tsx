import React, { useCallback, useRef, useState } from 'react';

import { StatusBar, Alert } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { BarCodeReadEvent, RNCamera } from 'react-native-camera';

import { IRestaurant, useAuth } from '../../hooks/auth';

import { Container, Title } from './styles';
import Button from '../../components/Button';
import api from '../../services/api';

const SignInQRCode: React.FC = () => {
  const { signIn } = useAuth();
  const [restaurant, setRestaurant] = useState<IRestaurant>();

  const handleQRCodeScanner = useCallback((e: BarCodeReadEvent) => {
    api
      .get<IRestaurant>(e.data)
      .then(response => {
        setRestaurant(response.data);
      })
      .catch(err => {
        console.log(err.message);
        Alert.alert('Erro na leitura do QR Code');
      });
  }, []);

  const signInRestaurant = useCallback(async () => {
    if (restaurant) {
      await signIn(restaurant);
    }
  }, [signIn, restaurant]);

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
            restaurant && (
              <Button onPress={signInRestaurant}>
                {`ir para ${restaurant.establishment_name}`}
              </Button>
            )
          }
        />
      </Container>
    </>
  );
};

export default SignInQRCode;
