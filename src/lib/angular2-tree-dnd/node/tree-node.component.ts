import {
    Component,
    Input,
    Inject,
    Optional,
    OnInit,
    ViewChildren,
    QueryList,
    forwardRef
} from 'angular2/core';
import {
    TransferableNode,
    DropZone,
    TreeNodeContent,
    RegisterService,
    RendererService,
    DragAndDropService,
    ChildrenLoaderService
} from '../';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subscription} from 'rxjs/Subscription';

export const DEFAULT_EXPANDED:string = "DEFAULT_EXPANDED";

@Component({
    selector: 'tree-node',
    directives: [DropZone, TreeNode, forwardRef(() => TreeNodeContent)],
    styles: [`
/*TODO renderer service should give us the left margin ?*/
        .tree-node-children {
            margin-left: 20px;
        }
        .tree-node-content {
            display: block;
        }
  `],
    template: `
    <tree-node-content class="tree-node-content" [node]="_this"></tree-node-content>
    <div class="tree-node-children">
        <drop-zone *ngIf="dndService" [parent]="_this" [index]="0"></drop-zone>
        <div [hidden]="!expanded">
            <div *ngFor="let child of getChildrenData(); let i = index">
              <tree-node [parent]="_this" [data]="child" [index]="i"></tree-node>
              <drop-zone *ngIf="dndService" [parent]="_this" [index]="i + 1"></drop-zone>
            </div>
        </div>
    </div>
`
})
export class TreeNode implements TransferableNode, OnInit {

    @Input() data:any;
    @Input() parent:TreeNode;
    @Input() index:number;
    // TODO Use a viewQuery ?
    @ViewChildren(TreeNode)
    private children:QueryList<TreeNode>;

    private id:string;

    private _onExpandedChanged:BehaviorSubject<boolean>;
    private expanded:boolean;

    private _onSelectedChanged:BehaviorSubject<boolean>;
    private selected:boolean;
    private _this = this;

    constructor(private register:RegisterService,
                private childrenLoaderService:ChildrenLoaderService,
                @Optional() private dndService:DragAndDropService,
                @Optional() @Inject(DEFAULT_EXPANDED) private defaultExpanded:boolean) {
        this.expanded = !!defaultExpanded;
        this._onExpandedChanged = new BehaviorSubject(this.expanded);
        this._onSelectedChanged = new BehaviorSubject(this.selected);
    }

    ngOnInit() {
        this.id = this.register.register(this);
    }

    getId():string {
        return this.id;
    }

    //------------------------------ Parent, Siblings and Children access ------------------------------//
    isRootNode():boolean {
        return !this.parent;
    }

    getChildrenData():any {
        return this.childrenLoaderService.getChildrenData(this);
    }

    getChildrenDataCount():number {
        return this.childrenLoaderService.getChildrenDataCount(this);
    }

    addChildData(index:number, data:any):void {
        this.childrenLoaderService.addChildData(this, index, data);
    }

    getSiblingNodes():TreeNode[] {
        if (this.parent) {
            return this.parent.children.toArray();
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
        return this.isExpanded() ? this.children.last.getLastOpenDescendant() : this;
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
            return this.children.first;
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
        if (this.isRootNode()) {
            console.log("Root node cannot be removed.");
            return false;
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
