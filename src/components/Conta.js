import React, {Component} from 'react';
import api from '../services/api';
import Button from 'react-bootstrap/Button';

export default class Conta extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
            textButton: "Já cadastrado? Faça Login!",
            textButton2: "Cadastrar",
            logado: (localStorage.getItem('token') != null) ? true : false
        }
    }

    conta = async () => {
        if(this.state.textButton2 == 'Cadastrar'){
            const config = {
                url: '/users',
                method: 'post',
                data : {
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password
                }
            }
            api.request(config)
                .then((response) => {
                    if(response.status == 200){
                        window.alert("Cadastro realizado com sucesso! \nEfetue Login para acessar!")
                    }else{
                        window.alert("Erro ao Cadastrar\nCadastro já existe");
                    }
                })
                .catch((error) => {
                    window.alert("Erro ao Cadastrar\nCadastro já existe");
                })
        }else if(this.state.textButton2 == 'Login') {
            const config = {
                url: '/sessions',
                method: 'post',
                data : {
                    email: this.state.email,
                    password: this.state.password
                }
            }
            api.request(config)
                .then((response) => {
                    if(response.status == 200){
                        localStorage.setItem('token', response.data.token)
                        window.alert("Login efetuado com sucesso");
                        window.location.reload(false);
                    }else{
                        window.alert("Erro ao efetuar login" + response);
                    }
                })
                .catch((error) => {
                    window.alert("Erro ao efetuar login");
                })
        }
    }

    getDataUser = () => {
        const config = {
            url: '/getuser',
            method: 'get',
            headers: { 
                Authorization: 'Bearer '.concat(localStorage.getItem('token'))
            }
        }
        api.request(config)
            .then((response) => {
                if(response.status == 200){
                    this.setState({
                        username: response.data.username,
                        email: response.data.email
                    })
                    console.log(response)
                }else{
                    console.error(response);
                    window.alert("Erro ao buscar os dados");    
                }
            })
            .catch((error) => {
                console.error(error);
                window.alert("Erro ao buscar os dados");
            })
    }

    salvaEstado(text, input) {
        this.setState({[input]: text.target.value});
    }

    changebutton() {
        if(this.state.textButton == "Já cadastrado? Faça Login!"){
            this.setState({
                textButton: 'Não tem conta ainda? Crie agora!',
                textButton2: 'Login'
            })
        }else{
            this.setState({
                textButton: 'Já cadastrado? Faça Login!',
                textButton2: 'Cadastrar'
            })
        }
    }

    deslogar() {
        localStorage.removeItem('token');
        window.location.reload(false);
    }

    render() {
        //Não está logado
        if (!this.state.logado) {
            return (
                <section>
                    <div className="bgline"></div>
                    <div className="login">
                        <div className="login-wrap">
                            <h2 id="h2daconta">{this.state.textButton2}</h2>
                            <div id="signup">
                                <form id="signup">
                                    <input id="user" type="text" className={`inputfield ${this.state.textButton2 == 'Login' ? 'hidden' : ''}`} placeholder="Username" onChange={(text) => { this.salvaEstado(text, "username") }} required/> 
                                    <input id="email" type="email" className="inputfield" placeholder="E-mail" onChange={(text) => { this.salvaEstado(text, "email") }} required/>
                                    <input if="senha" type="Password" className="inputfield" placeholder="Senha" onChange={(text) => { this.salvaEstado(text, "password") }} required/>
                                </form>
                                <button class="inputsubmit" onClick={() => this.conta()}>{this.state.textButton2}</button>
                                <div style={{margin: 10 + 'px'}}></div>
                                <button id="transformableButton" class="inputsubmit" onClick={() => this.changebutton()}>{this.state.textButton}</button>
                            </div>
                        </div>
                    </div>
                </section>
            )
        } else {
            if(this.state.username == "" || this.state.email == ""){
                this.getDataUser()
            }
            return (
                <section>
                    <div className="container1">
                        <div className="controle" align="center">

                            <div className="form-group">
                                <label>Nome de usuario</label>
                                <h4 type="text" class="form-control" id="exampleInputname" aria-describedby="name" disabled>{this.state.username}</h4> 
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Email</label>
                                <h4 type="email" class="form-control" id="exampleInputEmail1" aria-describedby="email" disabled>{this.state.email}</h4>
                            </div>

                            <Button class="inputsubmit" onClick={() => this.deslogar()}>SAIR</Button>
                        </div>
                    </div>
                </section>
            )
        }
    }
}