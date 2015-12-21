import {Component} from 'angular2/core';
import {Directory} from './directory';
import {CORE_DIRECTIVES} from 'angular2/common';

@Component({
    selector: 'directory-tree',
    inputs: ['directories: directories', 'selectedDir: selectedDir'],
    directives: [CORE_DIRECTIVES],
    //template: '<ul><li *ngFor="#dir of directories">{{dir.name}}</li></ul>'
    templateUrl: 'app/directory-tree.html',
})
export class DirectoryTreeCompoenent {
    directories:  Directory[];
    selectedDir = null;

    select(dir: Directory) {
        this.selectedDir = dir;
        console.log(dir);
    }
}