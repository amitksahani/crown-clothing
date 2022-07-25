import SignUpForm from '../../components/sign-up/sign-up-form.component'
import {signInWithGooglePopup, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'

const SignIn = () =>{
    const logGoogleUser = async ()=>{
        const {user} = await signInWithGooglePopup()
        const userDocRef = await createUserDocumentFromAuth(user)
    }
    return <div>
        <button onClick={logGoogleUser}>Sign In Page</button>
        <SignUpForm />
    </div>
}

export default SignIn