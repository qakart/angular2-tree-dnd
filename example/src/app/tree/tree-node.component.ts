import { Component, Input, DynamicComponentLoader, Injector, ComponentRef, ViewContainerRef, Inject } from 'angular2/core';
import {TreeNodeContent, TreeService, TREE_SERVICE} from './angular-tree-dnd';

@Component({
  selector: 'tree-node',
  directives: [TreeNode, TreeNodeContent],
  template: `
    <tree-node-content [node]="$this"></tree-node-content>
    <ul *ngIf="expanded">
        <li *ngFor="let child of getChildren()">
          <tree-node [parent]="$this" [data]="child"></tree-node>
        </li>
    </ul>
  `
})
export class TreeNode {

  @Input() data: any;
  @Input() parent: TreeNode;
  private $this: TreeNode;
  private expanded: boolean = true;

  constructor(@Inject(TREE_SERVICE) private treeService: TreeService) {
    this.$this = this;
  }

  toggle(){
    this.expanded = !this.expanded;
  }

  ngOnInit(){
    //const node: TreeNode = this.treeService.register(this.ref, this.data);
    //console.log(JSON.stringify(node));
  }

  getChildren (){
    return this.treeService.getChildren(this);
  }
}
