import {
    Component,
    Input,
    ComponentResolver,
    ComponentFactory,
    ComponentRef,
    ViewContainerRef,
    AfterViewInit,
    OnInit
} from 'angular2/core';
import {
    TreeNode,
    RendererService,
    TreeNodeContentRenderer
} from '../';

@Component({
    selector: 'tree-node-content',
    template: ``
})
export class TreeNodeContent implements AfterViewInit {

    @Input() node:TreeNode;

    constructor(private componentResolver:ComponentResolver,
                private viewContainerRef:ViewContainerRef,
                private renderer:RendererService) {
    }

    ngAfterViewInit() {
        console.log('node : '+this.node);
        // Insert node renderer
        this.componentResolver.resolveComponent(this.renderer.getTreeNodeContentRenderer(this.node))
            .then((componentFactory:ComponentFactory<TreeNodeContentRenderer>) => {
                let componentRef:ComponentRef<TreeNodeContentRenderer>
                    = this.viewContainerRef.createComponent(componentFactory, 0, this.viewContainerRef.injector);
                componentRef.instance.node = this.node;
            });
    }
}
