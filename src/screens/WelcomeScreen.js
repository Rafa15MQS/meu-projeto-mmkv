import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoWrapper}>
        <View style={styles.logoShadow} />
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>Z</Text>
        </View>
      </View>
      <Text style={styles.title}>Bem-vindo ao Zen Estoques</Text>
      <Text style={styles.subtitle}>Faça login para continuar</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Faça o Login</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>Ou</Text>
        <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  logoWrapper: {
    position: 'relative',
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoShadow: {
    position: 'absolute',
    width: 80,
    height: 80,
    backgroundColor: '#D8B4FE',
    borderRadius: 16,
    top: 6,
    left: 6,
  },

  logoBox: {
    width: 80,
    height: 80,
    backgroundColor: '#A855F7',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoText: {
    color: '#ffffff',
    fontSize: 40,
    fontWeight: 'bold',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 50,
  },

  actionsContainer: {
    width: '100%',
    alignItems: 'center',
  },

  button: {
    width: '100%',
    backgroundColor: '#A855F7',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#9333EA',
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  orText: {
    color: '#999999',
    fontSize: 14,
    marginVertical: 16,
  },
});