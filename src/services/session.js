// Variável global em memória para guardar o email do usuário logado
let loggedUserEmail = null;

export const SessionManager = {
  setLoggedUser: (email) => {
    loggedUserEmail = email;
    console.log('👤 [SESSÃO] Usuário guardado em memória:', email);
  },
  
  getLoggedUser: () => {
    return loggedUserEmail;
  },

  clearSession: () => {
    loggedUserEmail = null;
  }
};