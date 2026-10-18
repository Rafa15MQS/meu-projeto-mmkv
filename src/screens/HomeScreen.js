import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ route, navigation }) {
  const userName = route.params?.userName || 'Perfil';

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.topMenuContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.topMenuScroll}>
          <TouchableOpacity style={[styles.topChip, styles.activeChip]}><Text style={styles.topChipTextActive}>Home</Text></TouchableOpacity>
          <TouchableOpacity style={styles.topChip}><Text style={styles.topChipText}>Dashboard</Text></TouchableOpacity>
          <TouchableOpacity style={styles.topChip}><Text style={styles.topChipText}>Produtos</Text></TouchableOpacity>
          <TouchableOpacity style={styles.topChip}><Text style={styles.topChipText}>Vendas</Text></TouchableOpacity>
          <TouchableOpacity style={styles.topChip}><Text style={styles.topChipText}>Editar</Text></TouchableOpacity>
          <TouchableOpacity style={styles.topChip}><Text style={styles.topChipText}>Ajuda</Text></TouchableOpacity>
          <TouchableOpacity style={styles.topChip} onPress={() => navigation.navigate('Help')}><Text style={styles.topChipText}>Ajuda</Text></TouchableOpacity>
        </ScrollView>

        
        <TouchableOpacity style={styles.profileChip} onPress={handleProfilePress} activeOpacity={0.8}>
          <Ionicons name="person-circle" size={24} color="#A855F7" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.mainContent}>
        
        <View style={styles.logoWrapper}>
          <View style={styles.logoShadow} />
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>Z</Text>
          </View>
        </View>

        
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.mainButton} activeOpacity={0.8}>
            <Text style={styles.mainButtonText}>Cadastro</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.mainButton} activeOpacity={0.8}>
            <Text style={styles.mainButtonText}>Consultar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.mainButton} activeOpacity={0.8}>
            <Text style={styles.mainButtonText}>Remover</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.mainButton} activeOpacity={0.8}>
            <Text style={styles.mainButtonText}>Editar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      
      <View style={styles.footerDecorator} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  topMenuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 10,
    paddingRight: 12,
  },

  topMenuScroll: {
    paddingHorizontal: 16,
    gap: 8,
    alignItems: 'center',
  },

  topChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  activeChip: {
    backgroundColor: '#A855F7',
    borderColor: '#A855F7',
  },

  topChipText: {
    color: '#4B5563',
    fontSize: 13,
    fontWeight: '600',
  },

  topChipTextActive: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },

  profileChip: {
    padding: 4,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D8B4FE',
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 60,
  },

  logoWrapper: {
    position: 'relative',
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoShadow: {
    position: 'absolute',
    width: 70,
    height: 70,
    backgroundColor: '#D8B4FE',
    borderRadius: 16,
    top: 4,
    left: 4,
  },

  logoBox: {
    width: 70,
    height: 70,
    backgroundColor: '#A855F7',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoText: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: 'bold',
  },

  actionButtonsContainer: {
    width: '100%',
    gap: 16,
  },

  mainButton: {
    width: '100%',
    backgroundColor: '#A855F7',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#9333EA',
  },

  mainButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  footerDecorator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 140,
    height: 140,
    backgroundColor: '#A855F7',
    borderTopLeftRadius: 100,
    opacity: 0.8,
    zIndex: -1,
  },
});