import {
    Component,
    Input,
    ComponentResolver,
    ComponentFactory,
    ComponentRef,
    ViewContainerRef,
    Inject,
    Optional,
    OnInit,
    Type,
    AfterViewInit
} from 'angular2/core';
import {
    DropZone,
    RegisterService,
    RendererService,
    DragAndDropService,
    ChildrenLoaderService,
    TreeNodeChildrenRenderer,
    TreeNodeContentRenderer
} from '../';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subscription} from 'rxjs/Subscription';

export const DEFAULT_EXPANDED:string = "DEFAULT_EXPANDED";

@Component({
    selector: 'tree-node',
    template: ``
})
export class TreeNode implements OnInit, AfterViewInit  {

    @Input() data:any;
    @Input() parent:TreeNode;
    @Input() index:number;
    private children:TreeNode[];

    private id:string;

    private _onExpandedChanged:BehaviorSubject<boolean>;
    private expanded:boolean;

    private _onSelectedChanged:BehaviorSubject<boolean>;
    private selected:boolean;

    constructor(private componentResolver:ComponentResolver,
                private viewContainerRef:ViewContainerRef,
                private register:RegisterService,
                private renderer:RendererService,
                private childrenLoaderService:ChildrenLoaderService,
                @Optional() private dndService:DragAndDropService,
                @Optional() @Inject(DEFAULT_EXPANDED) private defaultExpanded:boolean) {
        this.expanded = !!defaultExpanded;
        this._onExpandedChanged = new BehaviorSubject(this.expanded);
        this._onSelectedChanged = new BehaviorSubject(this.selected);

        this.children = [];
    }

    ngOnInit() {
        this.id = this.register.register(this);
    }

    ngAfterViewInit(){
        if (this.dndService){
            // Insert drop as next sibling zone
            this.componentResolver.resolveComponent(<Type>DropZone)
                .then((componentFactory:ComponentFactory<DropZone>) => {
                    let componentRef:ComponentRef<DropZone>
                        = this.viewContainerRef.createComponent(componentFactory, 0, this.viewContainerRef.injector);
                    componentRef.instance.parent = this.parent;
                    componentRef.instance.index = this.index + 1;
                });

            // Insert drop as first child
            this.componentResolver.resolveComponent(<Type>DropZone)
                .then((componentFactory:ComponentFactory<DropZone>) => {
                    let componentRef:ComponentRef<DropZone>
                        = this.viewContainerRef.createComponent(componentFactory, 0, this.viewContainerRef.injector);
                    componentRef.instance.parent = this;
                    componentRef.instance.index = 0;
                });
        }

        // Insert children renderer
        this.componentResolver.resolveComponent(this.renderer.getTreeNodeChildrenRenderer(this))
            .then((componentFactory:ComponentFactory<TreeNodeChildrenRenderer>) => {
                let componentRef:ComponentRef<TreeNodeChildrenRenderer>
                    = this.viewContainerRef.createComponent(componentFactory, 0, this.viewContainerRef.injector);
                componentRef.instance.node = this;
            });

        // Insert node renderer
        this.componentResolver.resolveComponent(this.renderer.getTreeNodeContentRenderer(this))
            .then((componentFactory:ComponentFactory<TreeNodeContentRenderer>) => {
                let componentRef:ComponentRef<TreeNodeContentRenderer>
                    = this.viewContainerRef.createComponent(componentFactory, 0, this.viewContainerRef.injector);
                componentRef.instance.node = this;
            });

    }

    getId():string {
        return this.id;
    }

    //------------------------------ Parent, Siblings and Children access ------------------------------//
    getChildrenData():any {
        return this.childrenLoaderService.getChildrenData(this);
    }

    getChildrenDataCount():number {
        return this.childrenLoaderService.getChildrenDataCount(this);
    }

    addChildData(index:number, data:any):void {
        this.childrenLoaderService.addChildData(this, index, data);
    }

    registerChildNode(child:TreeNode) {
        this.children[child.index] = child;
    }

    isRootNode():boolean {
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

    private getLastOpenDescendant() {
        return this.isExpanded() ? this.children[this.children.length - 1].getLastOpenDescendant() : this;
    }

    getPreviousNode():TreeNode {
        if (this.isRootNode()) {
            return null;
        }
        const previousSibling:TreeNode = this.getPreviousSibling();
        if (previousSibling) {
            return previousSibling .getLastOpenDescendant();
        }
        return this.parent;
    }

    getNextNode():TreeNode {
        if (this.expanded && this.children.length) {
            return this.children[0];
        }
        let current:TreeNode = this;
        while (current) {
            const parentNextSibling:TreeNode = current.getNextSibling();
            if (parentNextSibling) {
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

        this.register.unregister(this);
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

    expand():boolean {
        if (!this.expanded) {
            this.toggleExpanded();
            return true;
        }
        return false;
    }

    collapse():boolean {
        if (this.expanded) {
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
