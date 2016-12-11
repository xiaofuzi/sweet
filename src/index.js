import {
    h,
    create,
    patch,
    diff
} from './vDom.js';
import Component from './Component.js';

function renderDOM (AppComponent, selector) {
    let instanceApp = new AppComponent();
    let rootNode = create(h('div', { id: instanceApp.$id }, [instanceApp.$vTree]));
    document.querySelector(selector).appendChild(rootNode);
}
export {
    renderDOM,
    Component
}