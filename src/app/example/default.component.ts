import { Component } from '@angular/core';
import {TreeService, DefaultTreeService, FIELD_NAME, DEFAULT_EXPANDED, TreeNode, DefaultTreeNodeRenderer, DefaultTreeNodeChildrenRenderer} from '../../lib/angular2-tree-dnd/index';

@Component({
  selector: 'default',
  providers: [
    {provide: TreeService, useClass: DefaultTreeService},
    {provide: FIELD_NAME, useValue: 'name'},
    {provide: DEFAULT_EXPANDED, useValue: false}
  ],
  directives: [TreeNode],
  pipes: [ ],
  styles: [`
  md-card{
    margin-bottom: 15px;
  }
  `],
  template: `
  <md-card>
    <md-card-title>Default Tree</md-card-title>
    <md-card-content>
      <tree-node [data]="data"></tree-node>
      <br/>
      <em *ngIf="treeService.getSelectedNode()">Selected node: {{treeService.getSelectedNode().id}} - {{treeService.getSelectedNode().data.name}}</em>
      <br/>
      <button md-button (click)="addNode()">
            Add Node
      </button>
    </md-card-content>
  </md-card>
  `
})
export class Default {

  data = {
    name: 'root',
    children: [
      {name: 'level1a'},
      {name: 'level1b'},
      {name: 'level1c'},
      {
        name: 'level1a', children: [
        {name: 'level2a'},
        {name: 'level2b'},
        {
          name: 'level2c', children: [
          {name: 'level3a'},
          {
            name: 'level3b', children: [
            {name: 'level4a'},
            {name: 'level4b'},
            {name: 'level4c'}
          ]
          },
          {name: 'level3c'}
        ]
        }
      ]
      }
    ]
  };

  constructor(private treeService:TreeService){
  }

  addNode() {
    const selectedNodeData = this.treeService.getSelectedNode() ? this.treeService.getSelectedNode().data : this.data;
    if (!selectedNodeData.children){
      selectedNodeData.children = [];
    }
    selectedNodeData.children.push({name: 'added'});
  }
}
