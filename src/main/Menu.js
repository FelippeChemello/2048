import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './style.css';

let links = [
    { route: "/", label: "Home"},
    { route: "/projetos", label: "Projetos"},
    { route: "/criarvideoautomatic", label: "Criar Video Automatico"},
    { route: "/conta", label: "Conta"}

];

export class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            logado: (localStorage.getItem('token') != null) ? true : false
        }
    }

    checkLinksAvaiable = () => {
        if (!this.state.logado) {
            delete links[2]; //Video manual
        }
    }

    renderLink = () => {
        this.checkLinksAvaiable(links);
        return links.map( link =>
            <Link key={link.route} className="nav-link" to={link.route}>
                {link.label}
            </Link>
        )
    }

    render() {
        return (
            <div>
                <header id="mainheader">
                    <nav className="navbar navbar-dark navbar-expand-lg fixed-top bg-white portfolio-navbar gradient">
                        <div className="container"><a className="navbar-brand logo" href="/">VMaker</a><button data-toggle="collapse" class="navbar-toggler" data-target="#navbarNav"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
                            <div className="collapse navbar-collapse"
                                id="navbarNav">
                                <ul className="nav navbar-nav ml-auto">
                                <div className="collapse navbar-collapse" id="navbarNav">
                                    <ul className="navbar-nav">
                                        { this.renderLink() }
                                    </ul>
                                </div>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        )
    }
};

export default Menu;

