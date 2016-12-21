import {
    Component,
    renderDOM
} from './src/index.js';

class HelloWorld extends Component {
    constructor (props) {
        super(props);

        this.state = {
            wellcome: 'hello'
        };
        setTimeout(()=>{
            this.setState({
                wellcome: this.state.wellcome + ' hello'
            })
        }, 5000);
    }

    componentDidMount () {
        console.log('HelloWorld did mount');
    }

    render (h) {
        return h('div.hello', {
            'id': 'hahahah'
        }, [
            this.state.wellcome
            ]);
    }
}

/**
 * list component
 */
class ListComponent extends Component {
    constructor (initialState) {
        super(initialState);
    }

    renderList (h) {
        let count = 1000,
            _list = [];

        while(count--) {
            _list.push(h('li.list-group-item', {
                        key: count
                    },[
                        'ListComponentInstance ' + this.state.name,
                        h('span.badge', [count])
                    ])
                );
        }

        return _list;
    }

    render (h) {
        return h('ul.list-group', [
                this.renderList(h)
            ])
    }
}

const HelloWorldComponent = new HelloWorld;
const ListComponentInstance = new ListComponent;

class App extends Component {
    constructor () {
        super();
    }

    componentDidMount () {
        console.log('App did mount');
    }

    renderList (h) {
        let count = 100,
            _list = [];

        while(count--) {
            _list.push(h(HelloWorldComponent, {
                            message: 'good job'
                        })
                    );
        }

        return _list;
    }

    render (h) {
        return h('div.wrapper', [
                h(
                    'div.main', [
                        h(ListComponentInstance)
                    ]
                )
            ]);
    }
}

renderDOM(new App, '#app');