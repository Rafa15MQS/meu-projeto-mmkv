import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import api from '../services/api';

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true; let newErrors = {};
    if (!nome.trim()) { newErrors.nome = 'O nome completo é obrigatório.'; isValid = false; }
    if (!email.trim()) { newErrors.email = 'O email é obrigatório.'; isValid = false; } 
    else if (!/\S+@\S+\.\S+/.test(email)) { newErrors.email = 'Insira um formato de email válido.'; isValid = false; }
    const telefoneLimpo = telefone.replace(/\D/g, '');
    if (!telefone.trim()) { newErrors.telefone = 'O telefone é obrigatório.'; isValid = false; } 
    else if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) { newErrors.telefone = 'O telefone deve ter 10 ou 11 dígitos.'; isValid = false; }
    if (!empresa.trim()) { newErrors.empresa = 'O nome da empresa é obrigatório.'; isValid = false; }
    if (!senha) { newErrors.senha = 'A senha é obrigatória.'; isValid = false; } 
    else if (senha.length < 6) { newErrors.senha = 'A senha deve ter pelo menos 6 caracteres.'; isValid = false; }
    if (!confirmarSenha) { newErrors.confirmarSenha = 'Confirme sua senha.'; isValid = false; } 
    else if (senha !== confirmarSenha) { newErrors.confirmarSenha = 'As senhas não coincidem. Tente novamente.'; isValid = false; }
    setErrors(newErrors); return isValid;
  };

const handleRegister = async () => {
  if (!validateForm()) {
    return;
  }

  try {
    const dados = {
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      telefone: telefone.replace(/\D/g, ""),
      empresa: empresa.trim(),
      senha,
    };

    console.log("A enviar cadastro:", {
      nome: dados.nome,
      email: dados.email,
      telefone: dados.telefone,
      empresa: dados.empresa,
      // A senha não deve aparecer no console
    });

    const response = await api.post("/register", dados);

    console.log("Status recebido:", response.status);
    console.log("Resposta recebida:", response.data);

    Alert.alert("Sucesso", "Conta criada com sucesso!", [
      {
        text: "OK",
        onPress: () => navigation.navigate("Login"),
      },
    ]);
  } catch (error) {
    console.log("Mensagem do erro:", error.message);
    console.log("Status do erro:", error.response?.status);
    console.log("Dados do erro:", error.response?.data);

    Alert.alert(
      "Erro",
      error.response?.data?.error ||
        error.response?.data?.message ||
        "Não foi possível comunicar com a API"
    );
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.title}>Criar Conta</Text>
            <Text style={styles.subtitle}>Por favor, insira os dados abaixo para cadastro</Text>
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Nome Completo</Text>
            <TextInput style={[styles.input, errors.nome ? styles.inputError : null]} placeholder="Insira seu nome Completo" placeholderTextColor="#999" value={nome} onChangeText={(text) => { setNome(text); setErrors({...errors, nome: null}); }} />
            {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}
            <Text style={styles.label}>Seu Email:</Text>
            <TextInput style={[styles.input, errors.email ? styles.inputError : null]} placeholder="Exemplo: usuario24@gmail.com" placeholderTextColor="#999" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={(text) => { setEmail(text); setErrors({...errors, email: null}); }} />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            <Text style={styles.label}>Seu Telefone:</Text>
            <TextInput style={[styles.input, errors.telefone ? styles.inputError : null]} placeholder="Exemplo: 11943250987" placeholderTextColor="#999" keyboardType="phone-pad" value={telefone} onChangeText={(text) => { setTelefone(text); setErrors({...errors, telefone: null}); }} />
            {errors.telefone && <Text style={styles.errorText}>{errors.telefone}</Text>}
            <Text style={styles.label}>Nome da Empresa:</Text>
            <TextInput style={[styles.input, errors.empresa ? styles.inputError : null]} placeholder="Exemplo: MarketingLoop" placeholderTextColor="#999" value={empresa} onChangeText={(text) => { setEmpresa(text); setErrors({...errors, empresa: null}); }} />
            {errors.empresa && <Text style={styles.errorText}>{errors.empresa}</Text>}
            <Text style={styles.label}>Senha:</Text>
            <TextInput style={[styles.input, errors.senha ? styles.inputError : null]} placeholder="Examplo|: 29356228&Fg" placeholderTextColor="#999" secureTextEntry={true} value={senha} onChangeText={(text) => { setSenha(text); setErrors({...errors, senha: null}); }} />
            {errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}
            <Text style={styles.label}>Confirmar Senha:</Text>
            <TextInput style={[styles.input, errors.confirmarSenha ? styles.inputError : null]} placeholder="Digite a senha anterior novamente" placeholderTextColor="#999" secureTextEntry={true} value={confirmarSenha} onChangeText={(text) => { setConfirmarSenha(text); setErrors({...errors, confirmarSenha: null}); }} />
            {errors.confirmarSenha && <Text style={styles.errorText}>{errors.confirmarSenha}</Text>}
          </View>
          <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
            <Text style={styles.primaryButtonText}>Confirmar Cadastro</Text>
          </TouchableOpacity>
        </ScrollView>
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
  },

  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
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
    marginBottom: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },

  formContainer: {
    width: '100%',
    marginBottom: 24,
  },

  label: {
    fontSize: 14,
    color: '#111',
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#A855F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#333',
  },

  inputError: {
    borderColor: '#EF4444',
  },

  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },

  primaryButton: {
    backgroundColor: '#A855F7',
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
