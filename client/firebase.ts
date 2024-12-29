import { initializeApp } from 'firebase/app';
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
  Auth,
} from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDMN7586RIizo6MsbRf-iBHf8k-sAnCzxs',
  authDomain: 'gamegatherer.firebaseapp.com',
  projectId: 'gamegatherer',
  storageBucket: 'gamegatherer.appspot.com',
  messagingSenderId: '951657871172',
  appId: '1:951657871172:web:b5b62f3fd7cf2b8cd20911',
  measurementId: 'G-ZJ89NMSCWZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Enable appVerificationDisabledForTesting for testing purposes
if (process.env.NODE_ENV === 'development') {
  try {
    (auth as any).settings.appVerificationDisabledForTesting = true;
    console.log('App verification disabled for testing');
  } catch (error) {
    console.error('Error setting appVerificationDisabledForTesting:', error);
  }
}

// Extend Window interface for recaptchaVerifier
declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

// Helper function to setup reCAPTCHA
const setupRecaptcha = (containerId: string): RecaptchaVerifier => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      containerId,
      {
        size: 'invisible',
        callback: () => {
          console.log('Recaptcha verified');
        },
      },
      auth
    );
  }
  return window.recaptchaVerifier;
};

// Helper function to send OTP
const sendPhoneOTP = async (phoneNumber: string, containerId: string): Promise<any> => {
  try {
    const recaptchaVerifier = setupRecaptcha(containerId);

    // Format the phone number (add country code if not provided)
    const formattedNumber = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;

    console.log('Sending OTP to:', formattedNumber);

    // Send OTP
    const confirmationResult = await signInWithPhoneNumber(auth, formattedNumber, recaptchaVerifier);
    console.log('OTP sent successfully');
    return confirmationResult;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
};

// Helper function to verify OTP
const verifyPhoneOTP = async (verificationId: string, otp: string): Promise<any> => {
  try {
    // Create a PhoneAuthCredential using verificationId and OTP
    const credential = PhoneAuthProvider.credential(verificationId, otp);

    // Sign in with the credential
    const result = await signInWithCredential(auth, credential);

    console.log('OTP verified successfully');
    return result;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

export {
  auth,
  setupRecaptcha,
  sendPhoneOTP,
  verifyPhoneOTP,
  RecaptchaVerifier,
  signInWithPhoneNumber,
};
