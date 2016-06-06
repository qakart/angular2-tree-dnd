import { Component } from '@angular/core';
import { SelectedNode } from './index';
import {TreeService, DefaultTreeService, RENDERED_FIELD_NAME, DEFAULT_EXPANDED, TreeNode, DefaultTreeNodeRenderer, DefaultTreeNodeChildrenRenderer, IdService, SimpleIdService, SingleSelectionService, SelectionService} from '../../lib/angular2-tree-dnd/index';

@Component({
  selector: 'default',
  providers: [
    {provide: IdService, useClass: SimpleIdService},
    {provide: TreeService, useClass: DefaultTreeService},
    {provide: SelectionService, useClass: SingleSelectionService},
    //{provide: TreeService, useValue: new DefaultTreeService(new SimpleIdService(), new SingleSelectionService())},
    {provide: RENDERED_FIELD_NAME, useValue: 'name'},
    {provide: DEFAULT_EXPANDED, useValue: false}
  ],
  directives: [TreeNode, SelectedNode],
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
      <selected-node></selected-node>
      <br/>
      <button md-button (click)="addNode()">
            Add Node
      </button>
       <button md-button (click)="deleteNode()">
            Delete Node
      </button>
      <!--TODO display json in right column-->
      <!--<pre>-->
      <!--<code>-->
      <!--{{data | json}}-->
      <!--</code>-->
      <!--</pre>-->
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
    const selectedNodeData = this.treeService.selection.hasSelectedNode() ? this.treeService.selection.getSelectedNode().data : this.data;
    if (!selectedNodeData.children){
      selectedNodeData.children = [];
    }
    selectedNodeData.children.push({name: 'added'});
  }

  deleteNode() {
    if (this.treeService.selection.hasSelectedNode()){
      this.treeService.selection.getSelectedNode().remove();
    }
  }
}
