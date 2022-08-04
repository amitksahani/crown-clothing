import { useState } from "react";
import { signInWithGooglePopup, createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss'
import Button from "../button/button.component";
const defaultFormFields = {
    email:'',
    password:'',
}

const SignInForm = () =>{

    const [formFields, setFormFields] = useState(defaultFormFields)

    const {email, password} = formFields;

    const handleChange = (event) =>{
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async ()=>{
        const {user} = await signInWithGooglePopup()
        await createUserDocumentFromAuth(user)
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();
        
        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password)
            resetFormFields()
        } catch (error) {
            if(error.code === 'auth/wrong-pasword'){
                alert('incorrect password for email')
            }else if(error.code === 'auth/user-not-found'){
                alert('user not found')
            }else{
                console.log(error)
            }
        }
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type='email' required name="email" value={email} onChange={handleChange} />
                <FormInput label='Password' type='password' required name="password" value={password} onChange={handleChange} />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;