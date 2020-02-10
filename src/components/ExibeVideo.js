import React, {Component} from 'react';
import ReactPlayer from 'react-player';

export class ExibeVideo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            link: 'https://vimeo.com/' + this.props.match.params.id
        }
    }
    
    render() {
        return (
            <div className='CorpoCVM'>
                <section className="portfolio-block projects compact-grid">
                <div className="heading">
                    <h1>Seu Video está pronto!!!</h1>
                </div>

                <ReactPlayer url={this.state.link} playing width='100%' />

                <small id="emailHelp" className="form-text text-muted">Caso o video não inicie em alguns segundos, recarregue a página</small>
                </section>
            </div>
        )
    }
}
export default ExibeVideo;