import {Component, forwardRef} from '@angular/core';
import {LazyTreeService, SelectedNode} from './index';
import {
    TreeService,
    RENDERED_FIELD_NAME,
    ID_FIELD_NAME,
    DEFAULT_EXPANDED,
    TreeNode,
    IdService,
    FieldIdService,
    SingleSelectionService,
    SelectionService,
    DelayChildrenLoaderService,
    ChildrenLoaderService
} from '../../lib/angular2-tree-dnd/index';

@Component({
    selector: 'lazy',
    providers: [
        {provide: ID_FIELD_NAME, useValue: 'id'},
        {provide: IdService, useClass: FieldIdService},
        {provide: TreeService, useClass: LazyTreeService},
        {provide: ChildrenLoaderService, useClass: DelayChildrenLoaderService},
        {provide: SelectionService, useClass: SingleSelectionService},
        {provide: RENDERED_FIELD_NAME, useValue: 'name'},
        {provide: DEFAULT_EXPANDED, useValue: false}
    ],
    directives: [TreeNode, SelectedNode],
    pipes: [],
    styles: [],
    template: `
  <md-card>
    <md-card-title>Lazy Tree</md-card-title>
    <md-card-content>
      <tree-node [data]="data"></tree-node>
      <br/>
      <selected-node></selected-node>
    </md-card-content>
  </md-card>
  `
})
export class Lazy {

    data = {
        id: 'r',
        name: 'root',
        children: [
            {id: '1a', name: 'level1a'},
            {id: '1b', name: 'level1b'},
            {id: '1c', name: 'level1c'},
            {
                id: '1c', name: 'level1c', children: [
                {id: '2a', name: 'level2a'},
                {id: '2b', name: 'level2b'},
                {
                    id: '2c', name: 'level2c', children: [
                    {id: '3a', name: 'level3a'},
                    {
                        id: '3b', name: 'level3b', children: [
                        {id: '4a', name: 'level4a'},
                        {id: '4b', name: 'level4b'},
                        {id: '4c', name: 'level4c'}
                    ]
                    },
                    {id: '3c', name: 'level3c'}
                ]
                }
            ]
            }
        ]
    };
}
