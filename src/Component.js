import {
    h,
    create,
    patch,
    diff
} from './vDom.js';
import {
   nextTick
} from './utils.js';

import Config from '../config.js';

let uid = 0;
export default class Component {
    /**
     * is-component
     */
    static __component__ = true

    constructor (props) {
        this.$vTree = null;
        this.$oldTree = null;
        this.$id = uid++;
        this.$parent = null;
        this.$el = null;
        this.$vNode = null;
        this.$children = {};

        this.state = {};

        this.renderDOM();
    }

    render (h) {
        return h('div');
    }

    setState (state, cb) {
        let newState = {
            ...this.state,
            ...state
        };
        this.state = newState;

        cb&&cb.call(this, newState);
        this._update();

        return newState;
    }

    getState () {
        return this.state;
    }

    renderDOM () {
        this.$oldTree = this.$vTree;
        this.$vTree = this.render(this.renderHelper);

        return this.$vTree;
    }

    renderHelper = (...rest) => {
        if (isComponent(rest[0])) {
            let child = new rest[0],
                vTree = child.renderDOM();
                this.$children[child.$id] = child;
                
                return h("div", { id: child.$id }, [vTree]);
        } else {
            return h.apply(null, rest);
        }
    }

    _update () {
        this.renderDOM();

        this.$el = document.getElementById(this.$id);
        let patches = diff(this.$oldTree, this.$vTree);
        let node=create(this.$Tree);
        patch(this.$el, patches);
    }
}


/**
 * helper function
 */
function isComponent (component) {
    if (typeof component === 'function') {
        let isComponent = false;
        if (component.__component__) {
            isComponent = true;
        }
        return isComponent;
    } else {
        return false;
    }
}



