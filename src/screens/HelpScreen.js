import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { SessionManager } from '../services/session';

export default function HelpScreen({ navigation }) {
  const userName = SessionManager.getLoggedUser() || 'Perfil';

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleContactPress = () => {
    Alert.alert("Contato", "Entre em contato conosco através do email: suporte@zenestoques.com");
  };

  const handleProblemPress = () => {
    Alert.alert("Reportar Problema", "Descreva o seu problema para a nossa equipa técnica.");
  };

  const handleRatingPress = () => {
    Alert.alert("Avaliação", "Obrigado por querer avaliar o Zen Estoques!");
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.topMenuContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.topMenuScroll}>
          <TouchableOpacity style={styles.topChip} onPress={() => navigation.navigate('Home')}><Text style={styles.topChipText}>Home</Text></TouchableOpacity>
          <TouchableOpacity style={styles.topChip}><Text style={styles.topChipText}>Dashboard</Text></TouchableOpacity>
          <TouchableOpacity style={styles.topChip}><Text style={styles.topChipText}>Produtos</Text></TouchableOpacity>
          <TouchableOpacity style={styles.topChip}><Text style={styles.topChipText}>Vendas</Text></TouchableOpacity>
          <TouchableOpacity style={styles.topChip}><Text style={styles.topChipText}>Editar</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.topChip, styles.activeChip]}><Text style={styles.topChipTextActive}>Ajuda</Text></TouchableOpacity>
        </ScrollView>

        <TouchableOpacity style={styles.profileChip} onPress={handleProfilePress} activeOpacity={0.8}>
          <Ionicons name="person-circle" size={24} color="#A855F7" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.mainContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.screenTitle}>Ajuda</Text>

        
        <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={handleContactPress}>
          <View style={styles.iconCircle}>
            <Ionicons name="call" size={28} color="#FFFFFF" />
          </View>
          <Text style={styles.cardTitle}>Contato</Text>
          <Text style={styles.cardSubtitle}>Precisa de alguma ajuda?{'\n'}Entre em contato conosco!</Text>
        </TouchableOpacity>

        
        <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={handleProblemPress}>
          <View style={styles.iconCircle}>
            <MaterialIcons name="assignment" size={28} color="#FFFFFF" />
          </View>
          <Text style={styles.cardTitle}>Problema</Text>
          <Text style={styles.cardSubtitle}>Está com algum Problema?{'\n'}Entre em contato conosco!</Text>
        </TouchableOpacity>

        
        <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={handleRatingPress}>
          <View style={styles.iconCircle}>
            <FontAwesome5 name="star" size={26} color="#FFFFFF" />
          </View>
          <Text style={styles.cardTitle}>Avaliação</Text>
          <Text style={styles.cardSubtitle}>Avalie o nosso App na Play{'\n'}store/Apple Store</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
     flex: 1, 
     backgroundColor: '#ffffff' 
     },

  topMenuContainer: {
     flexDirection: 'row', 
     alignItems: 'center', 
     borderBottomWidth: 1, 
     borderBottomColor: '#E5E7EB', 
     paddingVertical: 10, 
     paddingRight: 12 
     },

  topMenuScroll: {
     paddingHorizontal: 16, 
     gap: 8, 
     alignItems: 'center' 
     },
  topChip: {
     paddingHorizontal: 14, 
     paddingVertical: 8, 
     borderRadius: 20, 
     backgroundColor: '#F3F4F6', 
     borderWidth: 1, 
     borderColor: '#E5E7EB' 
     },

  activeChip: {
     backgroundColor: '#A855F7', 
     borderColor: '#A855F7' 
     },

  topChipText: {
     color: '#4B5563', 
     fontSize: 13, 
     fontWeight: '600' 
     },

  topChipTextActive: {
     color: '#ffffff', 
     fontSize: 13, 
     fontWeight: '600' 
     },

  profileChip: {
     padding: 4, 
     borderRadius: 20, 
     backgroundColor: '#F3F4F6', 
     borderWidth: 1, 
     borderColor: '#D8B4FE', 
     marginLeft: 4, 
     alignItems: 'center', 
     justifyContent: 'center' 
     },

  mainContent: {
     paddingHorizontal: 24, 
     paddingTop: 20, 
     paddingBottom: 40, 
     alignItems: 'center' 
     },

  screenTitle: {
     fontSize: 26, 
     fontWeight: 'bold', 
     color: '#111827', 
     alignSelf: 'flex-start', 
     marginBottom: 20 
     },

  card: {
     width: '100%', 
     backgroundColor: '#C084FC', 
     borderRadius: 20, 
     paddingVertical: 24, 
     paddingHorizontal: 20, 
     alignItems: 'center', 
     marginBottom: 20, 
     shadowColor: '#000', 
     shadowOffset: { width: 0, height: 2 }, 
     shadowOpacity: 0.1, 
     shadowRadius: 4, 
     elevation: 3 
     },

  iconCircle: {
     width: 56, 
     height: 56, 
     borderRadius: 28, 
     backgroundColor: '#3B82F6', 
     alignItems: 'center', 
     justifyContent: 'center', 
     marginBottom: 12 
     },

  cardTitle: {
     fontSize: 22, 
     fontWeight: 'bold', 
     color: '#FFFFFF', 
     marginBottom: 6 
     },

  cardSubtitle: {
     fontSize: 14, 
     color: '#FFFFFF', 
     textAlign: 'center', 
     lineHeight: 20, 
     fontWeight: '500' 
     }
});