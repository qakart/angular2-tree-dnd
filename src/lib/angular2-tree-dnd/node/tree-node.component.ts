import { Component, Input, DynamicComponentLoader, ComponentRef, ViewContainerRef, Inject, Optional, OnInit, OnDestroy} from 'angular2/core';
import {TreeNodeContent, TreeService, TreeNodeChildrenRenderer, DragAndDropService, ChildrenLoaderService} from '../index';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
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
    styles: [`
    .dropZone{
        width: 100%;
        height: 10px;
        border: 1px solid red;
    }
  `],
    template: `
        <tree-node-content  [node]="$this"></tree-node-content>
        <tree-node-children [node]="$this"></tree-node-children>
        <div class="dropZone dropAsChildZone" *ngIf="isDndAvailable()" (drop)="dropAsChild($event)" (dragover)="allowDropAsChild($event)"><!-- me index = 0 decallé --></div>
        <div class="dropZone dropAsNextZone" *ngIf="isDndAvailable()" (drop)="dropAsNextSibling($event)" (dragover)="allowDropAsNextSibling($event)"><!-- my parent my index +1 --></div>
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

    constructor(private treeService:TreeService, private childrenLoaderService:ChildrenLoaderService, @Optional() private dndService:DragAndDropService, @Optional() @Inject(DEFAULT_EXPANDED) private defaultExpanded:boolean) {
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

    //------------------------------ DND ------------------------------//
    // drop:(parent:TreeNode, index:number, $event:any) => void;
    // drag:(node:TreeNode, $event:any)=>void;
    // allowDrop:(parent:TreeNode, index:number, $event:any)=>void;
    isDndAvailable(): boolean {
        return !!this.dndService;
    }

    drag($event: any):void {
        this.dndService.drag(this, $event);
    }

    allowDropAsChild($event: any):void {
        this.dndService.allowDrop(this, 0, $event);
    }

    allowDropAsNextSibling($event: any):void {
        this.dndService.allowDrop(this.parent, this.index+1, $event);
    }

    dropAsChild($event: any):void {
        this.dndService.drop(this, 0, $event);
    }

    dropAsNextSibling($event: any):void {
        this.dndService.drop(this.parent, this.index+1, $event);
    }

    //------------------------------ Parent, Siblings and Children access ------------------------------//
    //TODO Create a childrenLoader    
    getChildrenData():any {
        return this.childrenLoaderService.getChildrenData(this);
    }

    getChildrenDataCount():number {
        return this.childrenLoaderService.getChildrenDataCount(this);
    }

    addChildData(index:number, data:any):void{
        this.childrenLoaderService.addChildData(this, index, data);
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

    private getNextSibling():TreeNode {
        const siblings:TreeNode[] = this.getSiblingNodes();
        if (this.index < siblings.length - 1) {
            return siblings[this.index + 1];
        }
        return null;
    }

    private getPreviousSibling():TreeNode {
        const siblings:TreeNode[] = this.getSiblingNodes();
        if (this.index > 0) {
            return siblings[this.index - 1];
        }
        return null;
    }

    private getLastOpenDescendant(){
        return this.isExpanded() ? this.children[this.children.length - 1].getLastOpenDescendant() : this;
    }

    getPreviousNode():TreeNode {
        if (this.isRootNode()) {
            return null;
        }
        const previousSibling:TreeNode = this.getPreviousSibling();
        if (previousSibling){
            return previousSibling .getLastOpenDescendant();
        }
        return this.parent;
    }

    getNextNode():TreeNode {
        if (this.expanded && this.children.length){
            return this.children[0];
        }
        let current: TreeNode = this;
        while(current){
            const parentNextSibling:TreeNode = current.getNextSibling();
            if (parentNextSibling){
                return parentNextSibling;
            }
            current = current.parent;
        }
        return null;
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

    expand(): boolean {
        if (!this.expanded){
            this.toggleExpanded();
            return true;
        }
        return false;
    }

    collapse(): boolean {
        if (this.expanded){
            this.toggleExpanded();
            return true;
        }
        return false;
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
