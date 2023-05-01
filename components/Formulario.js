import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import axios from 'axios';

const Formulario = ({
  moneda,
  criptomoneda,
  setMoneda,
  setCriptomoneda,
  setConsultarAPI,
}) => {
  const [criptomonedas, setCriptomonedas] = useState([]);

  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const resultado = await axios.get(url);
      setCriptomonedas(resultado.data.Data);
    };
    consultarAPI();
  }, []);

  const obtenerMoneda = moneda => {
    setMoneda(moneda);
    console.log(moneda);
  };

  const obtenerCriptoMoneda = criptoMoneda => {
    setCriptomoneda(criptoMoneda);
    console.log(criptoMoneda);
  };
  const cotizarPrecio = () => {
    if (moneda.trim() === '' || criptomoneda.trim() === '') {
      mostrarAlerta();
      return;
    }
    //Una vez pasada la validacion de los campos
    setConsultarAPI(true);
  };
  const mostrarAlerta = () => {
    Alert.alert('Error..', 'Ambos campos son obligatorios', [{text: 'OK'}]);
  };

  return (
    <View>
      <Text style={styles.label}>Modena</Text>
      <Picker
        itemStyle={{height: 120}}
        selectedValue={moneda}
        onValueChange={moneda => obtenerMoneda(moneda)}>
        <Picker.Item label="--Seleccione--" value="" />
        <Picker.Item label="Dolar de Estados Unidos" value="USD" />
        <Picker.Item label="Peso Mexicano" value="MXN" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra Esterlina" value="GBP" />
      </Picker>
      <Text style={styles.label}>Criptomoneda</Text>
      <Picker
        itemStyle={{height: 120}}
        selectedValue={criptomoneda}
        onValueChange={criptoMoneda => obtenerCriptoMoneda(criptoMoneda)}>
        <Picker.Item label="--Seleccione--" value="" />
        {criptomonedas.map(cripto => (
          <Picker.Item
            key={cripto.CoinInfo.Id}
            label={cripto.CoinInfo.FullName}
            value={cripto.CoinInfo.Name}
          />
        ))}
      </Picker>
      <TouchableHighlight
        style={styles.btnCotizar}
        onPress={() => cotizarPrecio()}>
        <Text style={styles.textoCotizar}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    fontSize: 18,
    marginVertical: 20,
  },
  btnCotizar: {
    backgroundColor: '#5E49E2',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  textoCotizar: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
export default Formulario;
