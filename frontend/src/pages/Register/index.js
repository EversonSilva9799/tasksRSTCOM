import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import Title from '../../components/Title';
import Button from '../../components/Button';
import Input from '../../components/Input';
import BackPage from '../../components/BackPage';
import './styles.css';

const Register = () => {
    const [state, setState] = useState({
        onHandle: false,
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        message: '',
        success: false,
    });

    const onChangeHandler = (e) => {
        const value = e.target.value;
        setState({...state, [e.target.name]: value})
    }


    return (
        <section className="box-content">
            <BackPage />
            <div className="box-form">
                <Title text="Faça seu cadastro" />
                <form>
                    <div className="box-input">
                        <Input type="text" name="name" 
                        value={state.name} 
                        placeholder="Nome" 
                        onChange={(e) => onChangeHandler(e)} />
                    </div>

                    <div className="box-input">
                        <Input type="email" name="email" 
                        value={state.email} 
                        placeholder="E-mail" 
                        onChange={(e) => onChangeHandler(e)} />                                             
                    </div>

                    <div className="box-input">
                        <Input type="password" name="password" 
                        value={state.password} 
                        placeholder="Senha" 
                        onChange={(e) => onChangeHandler(e)} />
                    </div>

                    <div className="box-input">
                        <Input type="password" name="passwordConfirmation" 
                        value={state.passwordConfirmation} 
                        placeholder="Confirmar senha" 
                        onChange={(e) => onChangeHandler(e)} />
                    </div>

                    <Button text="cadastrar" />
                </form>

                <div className="center">
                    <Link to="/login" className="text-link">Eu já possuo cadastro</Link>
                </div>
            </div>
        </section>
    );
}

export default Register;