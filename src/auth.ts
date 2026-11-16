const AUTH_KEY = 'rap-auth';
const ONBOARD_KEY = 'rap-onboarded';

export const isAuthed = () => localStorage.getItem(AUTH_KEY) === '1';
export const signIn = () => localStorage.setItem(AUTH_KEY, '1');
export const signOut = () => localStorage.removeItem(AUTH_KEY);
export const isOnboarded = () => localStorage.getItem(ONBOARD_KEY) === '1';
export const markOnboarded = () => localStorage.setItem(ONBOARD_KEY, '1');
