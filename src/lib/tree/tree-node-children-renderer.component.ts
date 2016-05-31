import { Component, Input, OnChanges, SimpleChange} from 'angular2/core';
import { TreeNode } from './../angular-tree-dnd'

@Component({
    selector: 'tree-node-field-renderer',
    directives: [TreeNode],
    template: `<ul *ngIf="node.isExpanded()">
        <li *ngFor="let child of node.getChildren()">
          <tree-node [parent]="node" [data]="child"></tree-node>
        </li>
    </ul>`
})
export class TreeNodeChildrenRenderer /*implements OnChanges*/ {
    @Input() node:TreeNode;

    //private loaded:boolean = false;
    //
    //setLoaded(){
    //    this.loaded = true;
    //}
    //
    //ngOnInit(){
    //    this.loaded = this.node.isExpanded();
    //}
    //
    //ngOnChanges(changes: {[propName: string]: SimpleChange}) {
    //    console.log('ngOnChanges - myProp = ' + changes['myProp'].currentValue);
    //    if (changes['expanded']){
    //        this.loaded = this.node.isExpanded();
    //    }
    //}
}