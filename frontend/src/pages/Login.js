import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormAction from "../components/FormAction";
import Header from "../components/Header";
import Input from "../components/Input";
import { apiURL } from "../constants/config";
import { loginFields } from "../constants/formFields";

export default function LoginPage() {
    const [loginState, setLoginState]= useState({});
    const navigate = useNavigate();

    const handleChange=(e) => {
        setLoginState({...loginState, [e.target.id] : e.target.value})
    }

    const handleSubmit=(e) => {
        e.preventDefault();
        handleLogin();
    }

    const handleLogin = () => {
        fetch(`${apiURL}/login`,
            {
            method:'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body:JSON.stringify(loginState)
            }).then(response=>response.json())
            .then(response => {
                if (response.token) {
                    localStorage.setItem('token', response.token);
                    navigate('/articles')
                }
            })
            .catch(error=>console.log(error))
    }

    return (
        <>
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <Header
                    heading="Login to your account"
                    paragraph="Don't have an account yet? "
                    linkName="Signup"
                    linkUrl="/signup"
            />
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        {
                            loginFields.map(field=>
                                    <Input
                                        key={field.id}
                                        handleChange={handleChange}
                                        value={loginState[field.id]}
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
                    <FormAction text="Login"/>
                </form>
            </div>
            </div>
        </>
    )
}