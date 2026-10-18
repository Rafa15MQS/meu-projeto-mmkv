
import { storage } from '../storage/storage';

const USERS_KEY = '@zen_estoques_users';

const api = {
  post: async (endpoint, bodyData) => {
    if (endpoint === '/register') {
      try {
        const { nome, email, telefone, empresa, senha } = bodyData;

        const usersJson = storage.getString(USERS_KEY);
        const users = usersJson ? JSON.parse(usersJson) : [];

        const userExists = users.find(u => u.email === email);

        if (userExists) {
          throw {
            response: {
              status: 409,
              data: { error: 'Este email já está cadastrado.' },
            },
          };
        }

        const newUser = { nome, email, telefone, empresa, senha };
        users.push(newUser);

        storage.set(USERS_KEY, JSON.stringify(users));

        return { data: { message: 'Usuário cadastrado com sucesso!' } };
      } catch (error) {
        if (error.response) throw error;

        throw {
          response: {
            status: 500,
            data: { error: 'Erro ao cadastrar localmente.' },
          },
        };
      }
    }

    if (endpoint === '/login') {
      const { email, password } = bodyData;

      const usersJson = storage.getString(USERS_KEY);
      const users = usersJson ? JSON.parse(usersJson) : [];

      const user = users.find(
        u => u.email === email && u.senha === password
      );

      if (!user) {
        throw {
          response: {
            status: 401,
            data: { error: 'Credenciais inválidas.' },
          },
        };
      }

      return {
        data: {
          message: 'Login bem-sucedido',
          token: 'fake-jwt-token-local',
        },
      };
    }
  },
};

export default api;
