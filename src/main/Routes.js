import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import Home from '../components/Home';
import Projetos from '../components/Projetos';
import Conta from '../components/Conta';
import ExibeVideo from '../components/ExibeVideo';
import CriarVideoAutomatic from '../components/CriarVideoAutomatic';

export class Routes extends Component {
    render() {
        return (
            <main className="container">
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/projetos' component={Projetos}/>
                    <Route path='/conta' component={Conta}/>
                    <Route path='/exibevideo/:id' component={ExibeVideo}/>
                    <Route path='/criarvideoautomatic' component={CriarVideoAutomatic}/>
                </Switch>
            </main>
        )
    }
};

export default Routes;