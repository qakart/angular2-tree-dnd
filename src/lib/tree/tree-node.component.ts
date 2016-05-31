import { Component, Input, DynamicComponentLoader, ComponentRef, ViewContainerRef, Inject, forwardRef} from 'angular2/core';
import {TreeNodeContent, TreeService, TREE_SERVICE} from './../angular-tree-dnd';

/**
 * Can't be place in its own file as it creates a circular dependency
 */
@Component({
    selector: 'tree-node-children',
    directives: [],
    template: ``
})
export class TreeNodeChildren {
    @Input() node:TreeNode;

    constructor(private dcl:DynamicComponentLoader,
                private viewContainerRef:ViewContainerRef,
                @Inject(TREE_SERVICE) private treeService:TreeService) {
    }

    ngOnInit() {
        this.dcl.loadNextToLocation(this.treeService.getTreeNodeChildrenRenderer(this.node), this.viewContainerRef).then((compRef:ComponentRef) => {
            compRef.instance['node'] = this.node;
        });
    }
}

export const DEFAULT_EXPANDED : string = "DEFAULT_EXPANDED";

@Component({
    selector: 'tree-node',
    directives: [TreeNodeContent, TreeNodeChildren],
    template: `
    <tree-node-content [node]="$this"></tree-node-content> {{expanded}}
    <tree-node-children [node]="$this"></tree-node-children>
  `
})
export class TreeNode {

    @Input() data:any;
    @Input() parent:TreeNode;
    private $this:TreeNode;
    expanded:boolean;

    constructor(@Inject(TREE_SERVICE) private treeService:TreeService, @Inject(DEFAULT_EXPANDED) private defaultExpanded: boolean) {
        this.$this = this;
        this.expanded = defaultExpanded;
    }

    toggle() {
        this.expanded = !this.expanded;
    }

    isExpanded() : boolean {
        return this.expanded;
    }

    getChildren() {
        return this.treeService.getChildren(this);
    }
}
