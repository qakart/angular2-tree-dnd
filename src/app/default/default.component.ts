import { Component, provide } from '@angular/core';
import {TREE_SERVICE, DefaultTreeService, FIELD_NAME, DEFAULT_EXPANDED, TreeNode} from '../../lib/angular2-tree-dnd';

@Component({
  selector: 'default',
  providers: [
    provide(TREE_SERVICE, {useClass: DefaultTreeService}),
    provide(FIELD_NAME, {useValue: 'name'}),
    provide(DEFAULT_EXPANDED, {useValue: false}),
  ],
  directives: [TreeNode],
  pipes: [ ],
  styles: [ `
.card-container{
    display: flex;
    flex-direction: column;
    margin: 15px;
}
.sample-content{
    flex: 1;
}
.card-container md-card{
    margin: 5px;
}
  ` ],
  template: `
  <div class="card-container">
  <md-card>
    <md-card-title>Default Tree</md-card-title>
    <md-card-content>
      <tree-node [data]="data"></tree-node>
      <br/>
      <button md-button router-active (click)="addNode()">
            Add Node
      </button>
    </md-card-content>
  </md-card>
  </div>
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

  addNode() {
    this.data.children.push({name: 'added'});
  }
}
