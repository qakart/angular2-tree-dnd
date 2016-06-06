import { Component, Input, DynamicComponentLoader, ComponentRef, ViewContainerRef, Inject, Optional, OnInit, OnDestroy} from 'angular2/core';
import {TreeNodeContent, TreeService, TreeNodeChildrenRenderer} from './index';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

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

export const DEFAULT_EXPANDED:string = "DEFAULT_EXPANDED";

@Component({
    selector: 'tree-node',
    directives: [TreeNodeContent, TreeNodeChildren],
    template: `
        <tree-node-content [node]="$this"></tree-node-content>
        <tree-node-children [node]="$this"></tree-node-children>
        `
})
export class TreeNode implements OnInit, OnDestroy {

    @Input() data:any;
    @Input() parent:TreeNode;
    @Input() index:number;
    // TODO We must maintain an array of children TreeNodes as the ngOnDestroy is broken since we use a DynamicComponentLoader to load children
    private children:TreeNode[];

    private id:string;
    private $this:TreeNode;

    private _onExpandedChanged:BehaviorSubject<boolean>;
    private expanded:boolean;

    private _onSelectedChanged:BehaviorSubject<boolean>;
    private selected:boolean;

    constructor(private treeService:TreeService, @Optional() @Inject(DEFAULT_EXPANDED) private defaultExpanded:boolean) {
        this.$this = this;
        this.expanded = !!defaultExpanded;
        this._onExpandedChanged = new BehaviorSubject(this.expanded);
        this._onSelectedChanged = new BehaviorSubject(this.selected);

        this.children = [];
    }

    ngOnInit() {
        this.id = this.treeService.register(this);
    }

    ngOnDestroy() {
        // TODO There is a bug in current version of Angular2 => ngOnDestroy is only called for the current node, not for its children.
    }

    getId():string {
        return this.id;
    }

    getChildrenData():any {
        return this.treeService.getChildrenData(this);
    }

    getChildrenDataCount():number {
        return this.treeService.getChildrenDataCount(this);
    }

    registerChildNode(child:TreeNode) {
        this.children[child.index] = child;
    }

    isRootNode(): boolean {
        return !this.parent;
    }

    getSiblingNodes():TreeNode[] {
        if (this.parent) {
            return this.parent.children;
        }
        return [];
    }

    getPreviousNode():TreeNode {
        if (this.isRootNode()) {
            return null;
        }
        if (this.index > 0) {
            return this.getSiblingNodes()[this.index - 1];
        }
        return this.parent;
    }

    getNextNode():TreeNode {
        if (this.isRootNode()) {
            return null;
        }
        const siblings:TreeNode[] = this.getSiblingNodes();
        if (this.index < siblings.length - 1) {
            return this.getSiblingNodes()[this.index + 1];
        }
        return this.parent.getNextNode();
    }

    remove():boolean {
        if (!this.parent) {
            console.log("Root node cannot be removed.");
            return false;
        }

        // Recursively remove children as the ngOnDestroy is broken
        for (var child of this.children) {
            child.remove();
        }

        this.treeService.unregister(this);
        // Delete node data from parent's children
        const siblingsData:any = this.parent.getChildrenData();
        siblingsData.splice(this.index, 1);
        return true;
    }

    //------------------------------ Expanded ------------------------------//
    toggleExpanded() {
        // Leaves cannot be expanded
        if (this.getChildrenDataCount() === 0) {
            return;
        }
        this.expanded = !this.expanded;
        this._onExpandedChanged.next(this.expanded);
    }

    isExpanded():boolean {
        return this.expanded;
    }

    onExpandedChanged(observer:(expanded:boolean) => void):Subscription {
        return this._onExpandedChanged.subscribe(observer);
    }

    //------------------------------ Selected ------------------------------//
    toggleSelected() {
        this.selected = !this.selected;
        this._onSelectedChanged.next(this.selected);
    }

    isSelected():boolean {
        return this.selected;
    }

    onSelectedChanged(observer:(selected:boolean) => void):Subscription {
        return this._onSelectedChanged.subscribe(observer);
    }
}
