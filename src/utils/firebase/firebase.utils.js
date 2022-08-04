import {initializeApp} from 'firebase/app'
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword
} from 'firebase/auth'
import {doc, getDoc, getFirestore, setDoc} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOZrcJ-mF0na-pnxE48C4Ptn_PuJrYyPE",
    authDomain: "crown-clothing-db-ba8b7.firebaseapp.com",
    projectId: "crown-clothing-db-ba8b7",
    storageBucket: "crown-clothing-db-ba8b7.appspot.com",
    messagingSenderId: "217896776804",
    appId: "1:217896776804:web:62b5fa24231f1752525b71"
  }; 
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  export const provider = new GoogleAuthProvider()
  provider.setCustomParameters({
    prompt: 'select_account'
  })

  export const auth = getAuth()
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

  export const db = getFirestore()
  export const createUserDocumentFromAuth = async (userAuth, additionalInfo)=>{
    const userDocRef = doc(db, 'user', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists())

    if(!userSnapshot.exists()){
      const {displayName, email} = userAuth
      const createdAt = new Date()
      try {
        await setDoc(userDocRef,{
          displayName,
          email,
          createdAt,
          ...additionalInfo
        } )
      } catch (error) {
        console.log('Error', error.message)
      }
    }
    return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password) return
    return await createUserWithEmailAndPassword(auth, email, password)
  }

  export const signInAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password) return
    return await signInWithEmailAndPassword(auth, email, password)
  }