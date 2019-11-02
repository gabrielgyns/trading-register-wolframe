class ListaNegociacoes {

    constructor() {
        this._negociacoes = [];
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }

    get negociacoes() {
        /**
            The [].concat is a defensive programming. 
            I'm creating a empty array and concating with the this._negociacoes
            If someone try to add any negociacao into negociacoes, 
            he will modifying the "copy" of negociacoes.
         */
        
        return [].concat(this._negociacoes);
    }

}