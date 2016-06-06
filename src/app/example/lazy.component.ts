import { Component, forwardRef } from '@angular/core';
import {LazyTreeService} from './index';
import { TreeService, FIELD_NAME, DEFAULT_EXPANDED, TreeNode } from '../../lib/angular2-tree-dnd/index';

@Component({
    selector: 'lazy',
    providers: [
        {provide: TreeService, useClass: LazyTreeService},
        {provide: FIELD_NAME, useValue: 'name'},
        {provide: DEFAULT_EXPANDED, useValue: false}
    ],
    directives: [TreeNode],
    pipes: [],
    styles: [],
    template: `
  <md-card>
    <md-card-title>Lazy Tree</md-card-title>
    <md-card-content>
      <tree-node [data]="data"></tree-node>
    </md-card-content>
  </md-card>
  `
})
export class Lazy {

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
}
