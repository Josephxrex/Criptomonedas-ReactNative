import React from 'react';
import {SafeAreaView, Text, StyleSheet, Platform} from 'react-native';

const Header = () => <Text style={styles.encabezado}>Criptomonedas</Text>;
const styles = StyleSheet.create({
  encabezado: {
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
    fontFamily: 'Lato-Black',
    backgroundColor: '#5E49E2',
    padding: 40,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 20,
    color: '#FFF',
    marginBottom: 30,
    borderBottomRightRadius:100,
    borderBottomLeftRadius:100,
  },
});
export default Header;
