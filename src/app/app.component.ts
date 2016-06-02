/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation, provide } from '@angular/core';

import {TreeService, TREE_SERVICE, DefaultTreeService, TreeNode, FIELD_NAME, DEFAULT_EXPANDED} from '../lib/angular-tree-dnd';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    pipes: [],
    providers: [
        provide(TREE_SERVICE, {useClass: DefaultTreeService}),
        provide(FIELD_NAME, {useValue: 'name'}),
        provide(DEFAULT_EXPANDED, {useValue: false}),
    ],
    directives: [TreeNode],
    encapsulation: ViewEncapsulation.None,
    styles: [
        require('normalize.css'),
        require('./app.css')
    ],
    template: `
    <md-content>
      <tree-node [data]="data"></tree-node>
      <button md-button router-active (click)="addNode()">
            Add Node
      </button>
    </md-content>
  `
})
export class App {

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
