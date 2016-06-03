import { Component, Input, DynamicComponentLoader, ComponentRef, ViewContainerRef, Inject, Optional} from 'angular2/core';
import {TreeNodeContent, TreeService, TreeNodeChildrenRenderer} from './index';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

/**
 * Can't be placed in its own file as it creates a circular dependency
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
                private treeService:TreeService) {
    }

    ngOnInit() {
        this.dcl.loadNextToLocation(this.treeService.getTreeNodeChildrenRenderer(this.node), this.viewContainerRef).then((compRef:ComponentRef<TreeNodeChildrenRenderer>) => {
            compRef.instance['node'] = this.node;
        });
    }
}

export const DEFAULT_EXPANDED : string = "DEFAULT_EXPANDED";

@Component({
    selector: 'tree-node',
    directives: [TreeNodeContent, TreeNodeChildren],
    template:
        `
        <tree-node-content [node]="$this"></tree-node-content>
        <tree-node-children [node]="$this"></tree-node-children>
        `
})
export class TreeNode {

    @Input() data:any;
    @Input() parent:TreeNode;
    private $this:TreeNode;
    private _onExpandedChanged: BehaviorSubject<boolean>;
    private expanded:boolean;

    constructor(private treeService:TreeService, @Optional()  @Inject(DEFAULT_EXPANDED) private defaultExpanded: boolean) {
        this.$this = this;
        this.expanded = !!defaultExpanded;
        this._onExpandedChanged = new BehaviorSubject(this.expanded);
    }

    toggle() {
        // Leaves cannot be expanded
        if (this.getChildrenCount() === 0){
            return;
        }
        this.expanded = !this.expanded;
        this._onExpandedChanged.next(this.expanded);
    }

    isExpanded() : boolean {
        return this.expanded;
    }

    onExpandedChanged(observer: (expanded: boolean) => void){
        this._onExpandedChanged.subscribe(observer);
    }

    getChildren() : any[] {
        return this.treeService.getChildren(this);
    }

    getChildrenCount() : number{
        return this.treeService.getChildrenCount(this);
    }
}
