import React, {Component} from 'react';
import api from '../services/api';

export class CriarVideoAutomatic extends Component {
  constructor(props) {
    super(props);

    this.state = {
        searchTerm: "",
        prefix: "",
        qtdSlide: "",
        language: "PT",
        enviou: false,
        id: null,
        titulo: "",
        url: "",
        terminou: false,
        lastStateUrl: null,
        lastRequisitionTime: 0
    }
  }

  salvaEstado(text, input) {
    this.setState({[input]: text.target.value});
  }

  enviaContent() {
    if (this.checkState()) {
      this.submitContent();
    }
  }

  checkState() {
    if(this.state.prefix != "") {
      if(this.state.searchTerm != "") {
        if(this.state.language == "PT" || this.state.language == "EN") {
          if(this.state.qtdSlide.match(/[0-9]{1,2}/)) {
            return true;
          }else{
            alert("Quantidade de Slides invalidos");
          }
        }else{
          alert("Linguagem Invalida");
        }
      }else{
        alert("Termo de pesquisa inválido");
      }
    }else{
      alert("Prefixo inválido"); 
    }
  }

  async submitContent() {
    const config = {
      url: '/content',
      method: 'post',
      headers: { 
          Authorization: 'Bearer '.concat(localStorage.getItem('token'))
      },
      data: {
        "prefix": this.state.prefix,
        "searchTerm": this.state.searchTerm,
        "language": this.state.language,
        "qtdSentences": this.state.qtdSlide,
        "typeOfCreation": "Automatic",
      }
    }
    await api.request(config)
      .then((response) => {
          console.log("Recebi o Id do video e a resposta foi " + response.status)
          if(response.status == 200){
            this.setState({
              'id': response.data,
              'enviou': true
            })  
            console.log("Salvei os estados")
          }else{
              console.error(response);
              window.alert("Erro ao criar video");    
          }
      })
      .catch((error) => {
          console.error(error);
          window.alert("Erro ao criar video");
      })
  }

  async buscaDadosDoVideo(){
    const config = {
      url: `/content/${this.state.id}`,
      method: 'get',
      headers: { 
        Authorization: 'Bearer '.concat(localStorage.getItem('token'))
      }
    }
    await api.request(config)
      .then((response) => {
          if(response.status == 200){
              if(response.data.url.match(/([0-9])+/g)){
                console.log("Finalizando")
                this.setState({
                  'url': response.data.url
                })
                window.location.href = "../exibevideo/" + response.data.url
              }else{
                if(this.state.lastStateUrl == null || this.state.lastStateUrl != response.data.url){
                  console.log("Incrementando")
                  this.setState({
                    'titulo': `${response.data.prefix} ${response.data.searchTerm}`,
                    'url': `${this.state.url} ${response.data.url} ...`,
                    'lastStateUrl': response.data.url
                  })
                }else{
                  console.log("Recebi a mesma informaçao")
                }
              }
          }else{
              console.error(response);
              window.alert("Erro ao receber resposta");    
          }
      })
      .catch((error) => {
          console.error(error);
          window.alert("Erro ao Buscar dados");
      })
  }

  render() {
    if(this.state.enviou){
      this.buscaDadosDoVideo()
      setInterval(() => {this.buscaDadosDoVideo()}, 3000);
      return (
        <div className="CorpoCVA">
          <main className="page AutomaticVideo">
            <section className="portfolio-block projects compact-grid">
              <div className="heading">
                <h2>Criar vídeo automáticamente</h2>
              </div>
              <div> 
                <h3>{this.state.titulo}</h3> 
                <h4>{this.state.url}</h4>
                <br></br>
                <button className="btn btn-primary" onClick={() => window.location.reload(false)}>Criar outro!</button>
              </div>
            </section>
          </main>
        </div>
      )
    }else{
      return (
        <div className="CorpoCVA">
          <main className="page AutomaticVideo">
            <section className="portfolio-block projects compact-grid">
              <div className="heading">
                <h2>Criar vídeo automáticamente</h2>
              </div>
              <form>  
                <div className="form-group">
                  <label for="Termo">Insira um termo para pesquisa:*</label>
                  <input required type="text" class="form-control" placeholder="Exemplo: Tecnologia" onChange={(text) => { this.salvaEstado(text, "searchTerm") }}/>
                </div>
                <div className="form-group">
                  <label for="prefixo">Diga o prefixo desejado:*</label>
                  <input type="text" class="form-control" placeholder="Exemplo: História da" onChange={(text) => { this.salvaEstado(text, "prefix") }}/>
                </div>
                <div className="form-group">
                  <label for="slides">Número de slides desejados:(1-15)*</label>
                  <input type="text" pattern="^[1-9]{1,2}$" required class="form-control" onChange={(text) => { this.salvaEstado(text, "qtdSlide") }}/>
                </div>
                <div className="form-group">
                  <label for="slides">Qual linguagem você deseja*</label>
                  <select class="form-control" onChange={(text) => { this.salvaEstado(text, "language") }}>
                    <option value="PT">Português</option>
                    <option value="EN">Inglês</option>
                  </select>
                </div>
              </form>
                <small id="emailHelp" className="form-text text-muted">*Campo obrigatório</small>
                <br></br>
                <button className="btn btn-primary" onClick={() => this.enviaContent()}>Enviar!</button>
              
            </section>
          </main>
        </div>
      )
    }
  }
}

export default CriarVideoAutomatic;
