import {Injectable, OpaqueToken} from 'angular2/core';

export class DefaultTreeConfig {
    constructor(public fieldName : string){
    }
}

export const DEFAULT_TREE_CONFIG = new OpaqueToken("DefaultTreeConfig");