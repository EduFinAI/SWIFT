/**
 * Swift Authentication System - MVP
 * Simple authentication for testing purposes
 */

// Global auth state
let authState = {
  isLoggedIn: false,
  userData: null
};

// Listeners array
let authListeners = [];

// Load state from localStorage
function loadAuthState() {
  try {
    const saved = localStorage.getItem('swift-auth-state');
    if (saved) {
      const parsed = JSON.parse(saved);
      authState.isLoggedIn = parsed.isLoggedIn || false;
      authState.userData = parsed.userData || null;
      console.log('Auth state loaded:', authState);
    }
  } catch (e) {
    console.warn('Failed to load auth state:', e);
  }
}

// Save state to localStorage
function saveAuthState() {
  try {
    localStorage.setItem('swift-auth-state', JSON.stringify(authState));
    console.log('Auth state saved:', authState);
  } catch (e) {
    console.warn('Failed to save auth state:', e);
  }
}

// Notify all listeners
function notifyAuthListeners() {
  console.log('=== NOTIFYING LISTENERS ===');
  console.log('Listeners count:', authListeners.length);
  console.log('Current auth state:', authState);
  
  authListeners.forEach((callback, index) => {
    try {
      console.log('Calling listener', index);
      callback(authState);
    } catch (e) {
      console.error('Error in auth listener:', e);
    }
  });
  
  console.log('All listeners notified');
}

// Add listener
function addAuthListener(callback) {
  authListeners.push(callback);
  console.log('Auth listener added. Total:', authListeners.length);
}

// Remove listener
function removeAuthListener(callback) {
  const index = authListeners.indexOf(callback);
  if (index > -1) {
    authListeners.splice(index, 1);
  }
}

// Login function
async function login(email, password) {
  console.log('=== LOGIN FUNCTION CALLED ===');
  console.log('Email:', email);
  console.log('Password:', password);
  
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Set logged in state
  authState.isLoggedIn = true;
  authState.userData = {
    id: 1,
    email: email,
    name: email.split('@')[0],
    firstName: email.split('@')[0],
    lastName: 'Usuário'
  };
  
  console.log('Auth state updated:', authState);
  
  saveAuthState();
  notifyAuthListeners();
  
  console.log('Login successful:', authState);
  return authState.userData;
}

// Logout function
function logout() {
  console.log('Logout');
  authState.isLoggedIn = false;
  authState.userData = null;
  saveAuthState();
  notifyAuthListeners();
  console.log('Logout successful');
}

// Get current state
function getAuthState() {
  return { ...authState };
}

// Create global SwiftAuth object
window.SwiftAuth = {
  isLoggedIn: () => authState.isLoggedIn,
  getUserData: () => authState.userData,
  getState: getAuthState,
  login: login,
  logout: logout,
  addListener: addAuthListener,
  removeListener: removeAuthListener,
  
  // Debug methods
  debug: {
    login: () => login('teste@swift.com', '123456'),
    logout: logout,
    state: () => {
      console.log('Current state:', getAuthState());
      console.log('localStorage:', localStorage.getItem('swift-auth-state'));
      return getAuthState();
    },
    clear: () => {
      localStorage.removeItem('swift-auth-state');
      authState.isLoggedIn = false;
      authState.userData = null;
      notifyAuthListeners();
      console.log('Auth data cleared');
    },
    forceLogin: () => {
      authState.isLoggedIn = true;
      authState.userData = {
        id: 1,
        email: 'teste@swift.com',
        name: 'teste',
        firstName: 'teste',
        lastName: 'Usuário'
      };
      saveAuthState();
      notifyAuthListeners();
      console.log('Force login completed');
    }
  }
};

// Initialize
loadAuthState();

console.log('SwiftAuth MVP initialized');
console.log('Available methods:');
console.log('- SwiftAuth.debug.login()');
console.log('- SwiftAuth.debug.logout()');
console.log('- SwiftAuth.debug.state()');
console.log('- SwiftAuth.debug.clear()');
console.log('- SwiftAuth.debug.forceLogin()');
console.log('Current state:', getAuthState());