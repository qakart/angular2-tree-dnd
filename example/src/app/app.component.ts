/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation, provide } from '@angular/core';

import {TreeService, TREE_SERVICE, DefaultTreeService, TreeNode, FIELD_NAME} from './tree/angular-tree-dnd';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [
    provide(TREE_SERVICE , {useClass: DefaultTreeService }),
    provide(FIELD_NAME, {useValue: 'name'}),
  ],
  directives: [ TreeNode ],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('normalize.css'),
    require('./app.css')
  ],
  template: `
    <md-content>
      <tree-node [data]="data"></tree-node>
    </md-content>
  `
})
export class App {

  data = {
    name : 'root',
    children : [
      { name: 'level1a' },
      { name: 'level1b' },
      { name: 'level1c' },
      { name: 'level1a' , children : [
        { name: 'level2a' },
        { name: 'level2b' },
        { name: 'level2c' , children : [
          { name: 'level3a' },
          { name: 'level3b' , children : [
            { name: 'level4a' },
            { name: 'level4b' },
            { name: 'level4c' }
          ]},
          { name: 'level3c' }
        ]}
      ]}
    ]
  };

}
