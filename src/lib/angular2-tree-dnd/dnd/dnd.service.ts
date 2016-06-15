import {TreeNode} from '../index'

export abstract class DragAndDropService {
    drop:(parent:TreeNode, index:number, $event:any) => void;
    drag:(node:TreeNode, $event:any)=>void;
    allowDrop:(parent:TreeNode, index:number, $event:any)=>void;
}