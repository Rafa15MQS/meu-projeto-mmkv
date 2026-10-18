
import { storage } from '../storage/storage';

const USERS_KEY = '@zen_estoques_users';
const LOGGED_USER_KEY = '@zen_estoques_logged_user';

export const debugDatabase = {
  // 1. Mostra todos os usuários cadastrados no console
  listarTodos: () => {
    try {
      const usersJson = storage.getString(USERS_KEY);
      const users = usersJson ? JSON.parse(usersJson) : [];

      console.log(
        '📦 [DATABASE] Usuários cadastrados:',
        JSON.stringify(users, null, 2)
      );

      return users;
    } catch (error) {
      console.log('❌ [DATABASE] Erro ao listar usuários:', error);
    }
  },

  // 2. Mostra quem está atualmente logado
  verUsuarioLogado: () => {
    try {
      const loggedEmail = storage.getString(LOGGED_USER_KEY);

      console.log('👤 [DATABASE] Email logado atualmente:', loggedEmail);

      return loggedEmail;
    } catch (error) {
      console.log('❌ [DATABASE] Erro ao verificar usuário logado:', error);
    }
  },

  // 3. Apaga os dados locais para começar do zero, se necessário
  limparBanco: () => {
    try {
      storage.delete(USERS_KEY);
      storage.delete(LOGGED_USER_KEY);

      console.log('🗑️ [DATABASE] Base de dados limpa com sucesso!');
    } catch (error) {
      console.log('❌ [DATABASE] Erro ao limpar base de dados:', error);
    }
  },
};
