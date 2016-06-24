import {Component} from '@angular/core';
import {SelectedNode} from './index';
import {
    RendererService,
    DefaultRendererService,
    RegisterService,
    DefaultRegisterService,
    RENDERED_FIELD_NAME,
    DEFAULT_EXPANDED,
    TreeNode,
    DragAndDropService,
    DefaultDragAndDropService,
    IdService,
    SimpleIdService,
    SingleSelectionService,
    SelectionService,
    KeyboardNavigation,
    ChildrenLoaderService,
    DefaultChildrenLoaderService
} from '../../lib/angular2-tree-dnd/index';
import {DnD} from './dnd.component'

@Component({
    selector: 'default',
    providers: [
        {provide: IdService, useClass: SimpleIdService},
        {provide: SelectionService, useClass: SingleSelectionService},
        {provide: DragAndDropService, useClass: DefaultDragAndDropService},
        {provide: ChildrenLoaderService, useClass: DefaultChildrenLoaderService},
        {provide: RendererService, useClass: DefaultRendererService},
        {provide: RegisterService, useClass: DefaultRegisterService},
        {provide: RENDERED_FIELD_NAME, useValue: 'name'},
        {provide: DEFAULT_EXPANDED, useValue: false}
    ],
    directives: [TreeNode, SelectedNode, KeyboardNavigation, DnD],
    pipes: [],
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
      <keyboard-navigation></keyboard-navigation>
      <!--TODO display json in right column-->
      <!--<pre>-->
      <!--<code>-->
      <!--{{data | json}}-->
      <!--</code>-->
      <!--</pre>-->
      <dnd></dnd>
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

    constructor(private selectionService:SelectionService) {
    }

    addNode() {
        const selectedNodeData = this.selectionService.hasSelectedNode() ? this.selectionService.getSelectedNode().data : this.data;
        if (!selectedNodeData.children) {
            selectedNodeData.children = [];
        }
        selectedNodeData.children.push({name: 'added'});
    }

    deleteNode() {
        if (this.selectionService.hasSelectedNode()) {
            this.selectionService.getSelectedNode().remove();
        }
    }

    onKeyUp($event) {
        console.log($event);
    }
}
