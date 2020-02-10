import React, {Component} from 'react';

export class Home extends Component {
    render() {
        return (
            <div className="corpo">
            <main className="page lanidng-page">
                    <section className="portfolio-block block-intro">
                        <div class="container">
                            <div className="about-me">
                            <p><strong>Seja bem-vindo!&nbsp;</strong><br/>Nós somos uma equipe empenhada no desenvolvimento de uma sistema capaz de criar videos de forma automatizada com auxílio de IA.&nbsp;<br />Basta você inserir um tema que o restante nós faremos
                                    por você!</p>   
                                <a className="btn btn-outline-primary" role="button" href="/projetos">Veja os videos já criados</a>
                            </div>
                        </div>
                    </section>
                    </main>  
                    </div>
        )
   }
};

export default Home;