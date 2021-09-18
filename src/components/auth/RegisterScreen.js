import {Link} from "react-router-dom";
import validator from 'validator';
import {useForm} from "../../hooks/useForm";

export const RegisterScreen = () => {

    const [formValues, handleInputChange] = useForm({
        name: 'Arian1',
        email: 'arian1@gmail.com',
        password: '1234567',
        password2: '1234567'
    });

    const {name, email, password, password2} = formValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if (isFormValid()) {
            console.log('Formulario correcto')
        }
    }

    const isFormValid = () => {
        if (name.trim().length === 0) {
            console.log('Name is required');
            return false;
        } else if (!validator.isEmail(email)) {
            console.log('Email is not valid');
            return false;
        } else if (password !== password2 || password.length < 5) {
            console.log('Mas de 6 caracteres')
            return false;
        }

            return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={handleRegister}>

                <div className="auth__alert-error">

                </div>

                <input type="text"
                       placeholder="Name"
                       name="name"
                       className="auth__input"
                       autoComplete="off"
                       value={name}
                       onChange={handleInputChange}/>

                <input type="text"
                       placeholder="Email"
                       name="email"
                       className="auth__input"
                       autoComplete="off"
                       value={email}
                       onChange={handleInputChange}/>

                <input type="password"
                       placeholder="Password"
                       name="password"
                       className="auth__input"
                       value={password}
                       onChange={handleInputChange}/>

                <input type="password"
                       placeholder="Confirm password"
                       name="password2"
                       className="auth__input"
                       value={password2}
                       onChange={handleInputChange}/>

                <button type="submit"
                        className="btn btn-primary btn-block mb-5">
                    Register
                </button>

                <Link to="/auth/login"
                      className="link">
                    Already register?
                </Link>
            </form>
        </>
    )
}