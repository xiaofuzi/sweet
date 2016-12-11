import {
    Component,
    renderDOM
} from './src/index.js';

class HelloWorld extends Component {
    constructor () {
        super();

        this.state = {
            wellcome: 'hello'
        };
        setTimeout(()=>{
            this.setState({
                wellcome: this.state.wellcome + ' hello'
            })
        }, 3000);
    }

    render (h) {
        return h('div.hello', {
            'id': 'hahahah'
        }, [
            this.state.wellcome
            ]);
    }
}

class App extends Component {
    constructor () {
        super();
    }

    render (h) {
        return h('div.wrapper', [
                h(
                    'div.main', [
                        'hello world',
                        h(HelloWorld)
                    ]
                )
            ]);
    }
}

renderDOM(App, '#app');