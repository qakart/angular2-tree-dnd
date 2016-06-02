import { Component, Input, DynamicComponentLoader, ComponentRef, ViewContainerRef, Inject} from 'angular2/core';
import {TreeService, TREE_SERVICE, TreeNode, TreeNodeContentRenderer} from './index';

@Component({
  selector: 'tree-node-content',
  template: ``
})
export class TreeNodeContent {
  @Input() node: TreeNode;

  constructor(private dcl: DynamicComponentLoader,
              private viewContainerRef: ViewContainerRef,
              @Inject(TREE_SERVICE) private treeService: TreeService) {
  }

  ngOnInit(){
    this.dcl.loadNextToLocation(this.treeService.getTreeNodeContentRenderer(this.node), this.viewContainerRef).then((compRef: ComponentRef<TreeNodeContentRenderer>) => {
      compRef.instance['node'] = this.node;
    });
  }
}
