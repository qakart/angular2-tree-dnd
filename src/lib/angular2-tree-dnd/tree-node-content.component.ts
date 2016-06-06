import { Component, Input, DynamicComponentLoader, ComponentRef, ViewContainerRef, Inject, OnInit} from 'angular2/core';
import {TreeService, TreeNode, TreeNodeContentRenderer} from './index';

@Component({
  selector: 'tree-node-content',
  template: ``
})
export class TreeNodeContent implements OnInit {
  @Input() node: TreeNode;

  constructor(private dcl: DynamicComponentLoader,
              private viewContainerRef: ViewContainerRef,
              private treeService: TreeService) {
  }

  ngOnInit(){
    this.dcl.loadNextToLocation(this.treeService.getTreeNodeContentRenderer(this.node), this.viewContainerRef).then((compRef: ComponentRef<TreeNodeContentRenderer>) => {
      compRef.instance['node'] = this.node;
    });
  }
}
