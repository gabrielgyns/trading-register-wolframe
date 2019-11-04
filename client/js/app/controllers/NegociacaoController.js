class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document );
        
        let self = this;
        this._form = $('form');
        
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        
        this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {
            get(target, prop, receiver){

                if(['adiciona', 'esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)){
                    
                    console.log(`interceptando: ${target[prop]}`);
                    Reflect.set(target[prop], target, arguments);
                    self._negociacoesView.update(target);
                }

            }
        });
        
        this._negociacoesView = new NegociacaoView($('#negociacoesView'));
        this._negociacoesView.update(this._listaNegociacoes);
        
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);
    }

    adiciona(event) {
        event.preventDefault();
        
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        
        this._mensagem.texto = 'Negociação adicionada com sucesso!';
        this._mensagemView.update(this._mensagem);

        this._form.reset();
        this._inputData.focus();
    }

    apaga() {
        this._listaNegociacoes.esvazia();

        this._mensagem.texto = 'Negociações apagadas com sucesso!';
        this._mensagemView.update(this._mensagem);
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

}