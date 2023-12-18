import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormAction from "../components/FormAction";
import Header from "../components/Header";
import Input from "../components/Input";
import { apiURL } from "../constants/config";
import { signupFields } from "../constants/formFields";

export default function SignupPage() {
    const [signupState, setSignupState]= useState({});
    const navigate = useNavigate();

    const handleChange=(e)=>{
        setSignupState({...signupState, [e.target.id] : e.target.value})
    }

    const handleSubmit=(e) => {
        e.preventDefault();
        handleSignup();
    }

    const handleSignup = () => {
        console.log(signupState)
        fetch(`${apiURL}/regitser`,
            {
            method:'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupState)
            }).then(response=>response.json())
            .then(response => {
                alert('Successfully registered');
                console.log(response);
                navigate('/');
            })
            .catch(error=>console.log(error))
    }
    return (
        <>
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <Header
              heading="Signup to create an account"
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/"
            />
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div>
                    {
                        signupFields.map(field=>
                                <Input
                                    key={field.id}
                                    handleChange={handleChange}
                                    value={signupState[field.id]}
                                    labelText={field.labelText}
                                    labelFor={field.labelFor}
                                    id={field.id}
                                    name={field.name}
                                    type={field.type}
                                    isRequired={field.isRequired}
                                    placeholder={field.placeholder}
                            />
                        
                        )
                    }
                </div>
                <FormAction text="Signup"/>
            </form>
        </div>
        </div>
        </>
    )
}