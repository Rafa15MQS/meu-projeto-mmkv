import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SessionManager } from '../services/session';

const USERS_KEY = '@zen_estoques_users';
const CURRENT_USER_KEY = '@zen_estoques_logged_user';

export default function ProfileScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [empresa, setEmpresa] = useState('');


  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const loggedEmail = SessionManager.getLoggedUser();
      const usersJson = await AsyncStorage.getItem('@zen_estoques_users');
      const users = usersJson ? JSON.parse(usersJson) : [];

      const currentUser = users.find(u => u.email === loggedEmail);
      if (currentUser) {
        setNome(currentUser.nome || '');
        setEmail(currentUser.email || '');
        setTelefone(currentUser.telefone || '');
        setEmpresa(currentUser.empresa || '');
      }
    } catch (error) {
      console.log('Erro ao carregar dados do perfil', error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const usersJson = await AsyncStorage.getItem(USERS_KEY);
      let users = usersJson ? JSON.parse(usersJson) : [];

      users = users.map(u => {
        if (u.email === email) {
          return { ...u, nome, telefone, empresa };
        }
        return u;
      });

      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
      Alert.alert("Sucesso", "Informações atualizadas com sucesso!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível guardar as alterações.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>


        <View style={styles.headerLogoContainer}>
          <View style={styles.headerLogoBox}>
            <Text style={styles.headerLogoText}>Z</Text>
          </View>
        </View>

        <Text style={styles.screenTitle}>Informações Pessoais</Text>


        <View style={styles.formContainer}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput 
            style={styles.input} 
            placeholder={nome || "Nome Completo"} 
            placeholderTextColor="#9CA3AF"
            value={nome} 
            onChangeText={setNome} 
          />

          <Text style={styles.label}>E-mail</Text>
          <TextInput 
            style={[styles.input, styles.disabledInput]} 
            placeholder={email || "email@email.com"} 
            placeholderTextColor="#9CA3AF"
            value={email} 
            editable={false} 
          />

          <Text style={styles.label}>Telefone</Text>
          <TextInput 
            style={styles.input} 
            placeholder={telefone || "(11) 91234-5678"} 
            placeholderTextColor="#9CA3AF"
            keyboardType="phone-pad"
            value={telefone} 
            onChangeText={setTelefone} 
          />

          <Text style={styles.label}>Empresa</Text>
          <TextInput 
            style={styles.input} 
            placeholder={empresa || "Nome da Empresa"} 
            placeholderTextColor="#9CA3AF"
            value={empresa} 
            onChangeText={setEmpresa} 
          />


          <TouchableOpacity style={styles.securityBox} activeOpacity={0.8}>
            <View>
              <Text style={styles.securityTitle}>Segurança</Text>
              <Text style={styles.securitySubtitle}>Alterar Senha</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Botões de Ação */}
        <TouchableOpacity style={styles.primaryButton} onPress={handleSaveChanges}>
          <Text style={styles.primaryButtonText}>Salvar alterações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryButtonText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteAccountContainer}>
          <Text style={styles.deleteAccountText}>Excluir minha conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 10,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  headerLogoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },

  headerLogoBox: {
    width: 60,
    height: 60,
    backgroundColor: '#A855F7',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-3deg' }],
  },

  headerLogoText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
  },

  screenTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
  },

  formContainer: {
    width: '100%',
    marginBottom: 20,
  },

  label: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 12,
  },

  input: {
    height: 50,
    borderWidth: 1.5,
    borderColor: '#A855F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#111827',
    backgroundColor: '#fff',
  },

  disabledInput: {
    backgroundColor: '#F9FAFB',
    borderColor: '#D1D5DB',
  },

  securityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: '#A855F7',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    backgroundColor: '#fff',
  },

  securityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },

  securitySubtitle: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 2,
  },

  primaryButton: {
    backgroundColor: '#A855F7',
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  secondaryButton: {
    backgroundColor: '#A855F7',
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  deleteAccountContainer: {
    alignItems: 'center',
    marginTop: 10,
  },

  deleteAccountText: {
    color: '#111827',
    fontSize: 14,
    fontWeight: 'bold',
  },
});