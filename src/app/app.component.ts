/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation, provide } from '@angular/core';
import { RouteConfig, Router } from '@angular/router-deprecated';

import {TreeService, TREE_SERVICE, DefaultTreeService, TreeNode, FIELD_NAME, DEFAULT_EXPANDED} from '../lib/angular2-tree-dnd';

import { Home } from './home';
import { RouterActive } from './router-active';

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
    directives: [RouterActive, TreeNode],
    encapsulation: ViewEncapsulation.None,
    styles: [
        require('normalize.css'),
        require('./app.css')
    ],
    template: `
    <md-content>
      <md-toolbar color="primary">
          <span>{{ name }}</span>
          <span class="fill"></span>
          <button md-button router-active [routerLink]=" ['Index'] ">
            Index
          </button>
          <button md-button router-active [routerLink]=" ['Home'] ">
            Home
          </button>
      </md-toolbar>

      <tree-node [data]="data"></tree-node>
      <button md-button router-active (click)="addNode()">
            Add Node
      </button>

      <router-outlet></router-outlet>
      </md-content>
  `
})
@RouteConfig([
    { path: '/',      name: 'Index', component: Home, useAsDefault: true },
    { path: '/home',  name: 'Home',  component: Home }
])
export class App {

    name = "Angular2 Tree DnD";

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
