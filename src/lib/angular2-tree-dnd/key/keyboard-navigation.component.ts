import { Component } from 'angular2/core';
import { SelectionService, TreeNode } from '../index';

@Component({
    selector: 'keyboard-navigation',
    template: `<div (window:keyup)="onKeyUp($event)"></div>`
})
export class KeyboardNavigation {

    private bindings: {[keyCode: string]:($event:any) => boolean} = {
        "ArrowUp" : ($event:any) => {
            const previous: TreeNode = this.selection.getSelectedNode().getPreviousNode();
            if (previous){
                previous.toggleSelected();
                return true;
            }
            return false;
        },
        "ArrowDown" : ($event:any) => {
            const previous: TreeNode = this.selection.getSelectedNode().getNextNode();
            if (previous){
                previous.toggleSelected();
                return true;
            }
            return false;
        },
        "ArrowRight" : ($event:any) => this.selection.getSelectedNode().expand(),
        "ArrowLeft" : ($event:any) => this.selection.getSelectedNode().collapse()
    };

    constructor(private selection:SelectionService) {
    }

    onKeyUp($event) {
        const action : ($event:any) => boolean = this.bindings[$event.code];
        if (action && this.selection.hasSelectedNode()){
            if (action($event)){
                $event.preventDefault();
            }
        }
    }
}