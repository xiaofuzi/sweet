import {
    h,
    create,
    patch,
    diff
} from './vDom.js';
import Component from './Component.js';

function renderDOM (AppComponent, selector) {
    let app = {
        isRendering: false,
        vTree: Object.create(null),
        rootNode: Object.create(null),
        rootComponent: null,
        update (cb) {
            console.log('to update times');
            if (this.isRendering) {
                return ;
            } else {
                this.isRendering = true;
                defer(()=>{
                    let patches = diff(this.vTree, this.rootComponent.$vTree);
                    this.rootNode = patch(this.rootNode, patches);

                    if (cb!=null) {
                        cb();
                    }
                    this.isRendering = false;
                    console.log('had update times');
                })
            }
        }
    };

    let rootComponent = app.rootComponent = AppComponent._initApp(app),
        $vTree = rootComponent.$vTree;

    app.rootComponent._initApp(app);
    app.rootNode = create($vTree);
    app.vTree = $vTree;

    document.querySelector(selector).appendChild(app.rootNode);
}

export {
    renderDOM,
    Component
}

/**
 * defer
 */
function defer (cb=()=>{}, Timer=0) {
    setTimeout(()=>{
        cb();
    }, Timer);
}