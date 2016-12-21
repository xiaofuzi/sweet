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
    constructor (initialState) {
        this.$vTree = null;
        this.$oldTree = null;
        this.$id = uid++;
        this.$parent = null;
        this.$el = null;
        this.$children = [];
        this.props = null;
        this.state = initialState || {};

        this._isMounted = false;

        /**
         * private data
         */
        this._componentCache = Object.create(null);

        this.renderDOM();
    }

    initProps (props) {
        this.props = props;

        return this;
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
        this.$vTree = this.render(this._renderHelper);

        return this.$vTree;
    }

    _initApp (app) {
        this.$app = app || this.$app;

        return this;
    }

    /**
     * life cycle hook
     */
    _receiveNewProps(nextProps) {
        this.componentWillReceiveProps&&this.componentWillReceiveProps(nextProps);

        this._update();
    }

    _didMount() {
        this.componentDidMount&&this.componentDidMount();
    }

    /**
     * component constructor
     */
    _hasId (id) {
        return (id!=null&&this._componentCache[id]) ? true : false;
    }

    /**
     * components helper methods
     */
    _appendTo (parent) {
        parent.$children.push(this);
        parent._componentCache[this.$id] = true;
        this.$parent = parent;

        if (!this.$app) {
            this.$app = parent.$app;
        }
        this._vDomUpdate();
    } 

    _renderHelper = (...rest) => {
        if (isComponent(rest[0])) {
            let child = rest[0];
            if (child.$parent&&child.$parent._hasId(child.$id)) {
                this._receiveNewProps(rest[1]);
            } else {
                /**
                 * render child component
                 * receive two params, componentName and props
                 */
                if (isComponent(this)) {
                    setTimeout(()=>{
                        child._appendTo(this);
                    }, 0);
                }
            }

            child.initProps(rest[1]);
            return child.renderDOM();
        } else {
            return h.apply(null, rest);
        }
    }

    _update () {
        this.renderDOM();
        this._vDomUpdate();
    }

    _vDomUpdate () {
        if (!this.$parent&&!this.$app) {
            console.warn(this.constructor.name + ' component was not mounted.' );

            return ;
        }
        this.$app.update(()=>{
            /**
             * excute first time
             */
            if (!this._isMounted) {
                this._didMount();
                this._isMounted = true;
            }
        });
    }
}


/**
 * helper function
 */
function isComponent (component) {
    if (component instanceof Component) {
        return true;
    } else {
        return false;
    }
}



