import React, {Component} from 'react';
import ReactPlayer from 'react-player';
import api from '../services/api';

export class Projetos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            links: []
        }

        this.getLastVideos();
        
    }

    getLastVideos = async () => {
        const config = {
            url: '/lastVideos',
            method: 'get'
          }
          await api.request(config)
            .then((response) => {
                if(response.status == 200){
                    for(let i = 0; i < response.data.length; i++) {
                        const url = response.data[i].url;
                        this.state.links.push(url);
                        console.log("A")
                        this.setState({'videos': this.montaVideos()});
                    }
                }else{
                    console.error(response);
                    window.alert("Erro no status");    
                }
            })
            .catch((error) => {
                console.error(error);
                window.alert("Erro realizar request");
            })
    }
    
    montaVideos = () => {
        let videos = [];
        for(let i = 0; i < this.state.links.length; i++) {
            videos.push(
                    <ReactPlayer url={'https://vimeo.com/'+this.state.links[i]} width='100%' key={i} />
            );
        }
        return videos;
    }

    render() {
        return (
            <div className='CorpoProjeto'>
                <div className="heading" id='ProjetoTitle'>
                    <h2>Ultimos videos criados</h2>
                </div>

                <div className="row no-gutters">
                    {this.state.videos}
                </div>
                <br></br>
            </div>
        )
    }
}

export default Projetos;