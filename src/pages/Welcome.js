import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styled, {css} from 'styled-components';
import Fontisto from 'react-native-vector-icons/Fontisto'
import { useSelector } from 'react-redux';
import { CommonActions } from '@react-navigation/native';


const Welcome = ({navigation}) => {
  const user = useSelector(state => state.user)

  useEffect(() => {
    if(user.id){
      navigation.dispatch(CommonActions.reset({
        index: 0,
        routes: [{name: 'Home'}]
      }))
    }
  }, [user.id])

  return (
    <Container colors={['#B7753E', '#C1272D', '#C1272D']}>
      <Wrapper>
        <Text welcome>Selamat datang di</Text>
        <Text title>DPRD Now!</Text>
        <Text>
          Disinilah tempat untuk mencurahkan aspirasi dan pengaduan kepada DPRD.
        </Text>
      </Wrapper>
      <Wrapper>
        <Button onPress={() => navigation.navigate('Login')}>
          <IconFontisto name='email' size={18} color='white'/>
          <Text>Login with email</Text>
        </Button>
        <Wrapper inline>
          <Text>Belum pernah mendaftar?</Text>
          <RegisterButton onPress={() => navigation.navigate('Register')}>
            <Text register>Daftar disini</Text>
          </RegisterButton>
        </Wrapper>
      </Wrapper>
    </Container>
  );
};

export default Welcome;

const Container = styled(LinearGradient)`
  flex: 1;
`;

const Wrapper = styled.View`
  align-items: center;

  ${({inline}) => {
    if(inline){
      return css`
        flex-direction: row;
        justify-content: center;
        width: 100%;
      `
    }
  }}
`;

const Text = styled.Text`
  color: white;
  font-size: 18px;
  text-align: center;
  max-width: 85%;

  ${({title}) => {
    if (title) {
      return css`
        font-size: 45px;
        font-weight: bold;
        margin: 15px;
      `;
    }
  }}

  ${({welcome}) => {
    if (welcome) {
      return css`
        font-weight: bold;
        margin-top: 40px;
        font-size: 20px;
      `;
    }
  }}

  ${({register}) => {
    if (register) {
      return css`
        max-width: 100%;
        font-weight: bold;
      `;
    }
  }}
`;

const Button = styled.TouchableOpacity`
  margin: auto;
  width: 100%;
  height: 22%;
  max-width: 80%;
  border-width: 1px;
  border-color: white;
  border-radius: 15px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const IconFontisto = styled(Fontisto)`
  margin-right: 10px;
`

const RegisterButton = styled.TouchableOpacity`
  width: 28%;
`