import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons'; 
import api from '../services/api';
import { SessionManager } from '../services/session';
import { debugDatabase } from '../services/debugUsers';
import { mostrarAlerta } from '../utils/mensagem';




export default function LoginScreen({ navigation }) {



  debugDatabase.listarTodos();

  debugDatabase.verUsuarioLogado();


 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateForm = () => {
    let isValid = true;
    setEmailError(''); setPasswordError('');
    if (!email) { setEmailError('O email é obrigatório.'); isValid = false; } 
    else if (!/\S+@\S+\.\S+/.test(email)) { setEmailError('Insira um email válido.'); isValid = false; }
    if (!password) { setPasswordError('A senha é obrigatória.'); isValid = false; } 
    else if (password.length < 6) { setPasswordError('Senha incorreta'); isValid = false; }
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    try {
      setPasswordError('');
      
      const response = await api.post('/login', { email, password });
      console.log('Login bem-sucedido!', response.data);

      SessionManager.setLoggedUser(email);
      navigation.replace('Home');
      

      navigation.replace('Home');
    } catch (error) {
      setPasswordError('Credenciais inválidas');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.title}>Log in</Text>
          <View style={styles.titleUnderline} />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={[styles.input, emailError ? styles.inputError : null]} placeholder="contact@dscodetech.com" placeholderTextColor="#999" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          <Text style={[styles.label, { marginTop: 16 }]}>Senha</Text>
          <View style={[styles.passwordContainer, passwordError ? styles.inputError : null]}>
            <TextInput style={styles.passwordInput} placeholder="••••••••••••" placeholderTextColor="#999" secureTextEntry={!showPassword} value={password} onChangeText={setPassword} />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#ccc" />
            </TouchableOpacity>
          </View>
          <View style={styles.passwordFooter}>
            <Text style={styles.errorText}>{passwordError}</Text>
            <TouchableOpacity><Text style={styles.forgotPassword}>Esqueceu a senha?</Text></TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}><Text style={styles.primaryButtonText}>Continue</Text></TouchableOpacity>
        </View>
        <View style={styles.dividerContainer}><View style={styles.dividerLine} /><Text style={styles.dividerText}>Ou</Text><View style={styles.dividerLine} /></View>
        <TouchableOpacity style={styles.socialButton}><FontAwesome name="apple" size={20} color="#000" /><Text style={styles.socialButtonText}>Login with Apple</Text></TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}><Ionicons name="logo-google" size={20} color="#DB4437" /><Text style={styles.socialButtonText}>Login with Google</Text></TouchableOpacity>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}><Text style={styles.signupLink}>Sign up</Text></TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  header: {
    alignItems: 'center',
    marginBottom: 30,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#A855F7',
  },

  titleUnderline: {
    width: 100,
    height: 3,
    backgroundColor: '#3B82F6',
    marginTop: 8,
    borderRadius: 2,
  },

  formContainer: {
    width: '100%',
  },

  label: {
    fontSize: 14,
    color: '#A855F7',
    fontWeight: '600',
    marginBottom: 8,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#A855F7',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A855F7',
    borderRadius: 10,
    paddingHorizontal: 16,
    height: 50,
  },

  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },

  inputError: {
    borderColor: '#EF4444',
  },

  passwordFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
    minHeight: 20,
  },

  errorText: {
    color: '#EF4444',
    fontSize: 12,
  },

  forgotPassword: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '500',
  },

  primaryButton: {
    backgroundColor: '#A855F7',
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },

  dividerText: {
    marginHorizontal: 16,
    color: '#9CA3AF',
    fontSize: 14,
  },

  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderWidth: 1,
    borderColor: '#A855F7',
    borderRadius: 12,
    marginBottom: 16,
  },

  socialButtonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },

  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  signupText: {
    color: '#6B7280',
    fontSize: 14,
  },

  signupLink: {
    color: '#A855F7',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

