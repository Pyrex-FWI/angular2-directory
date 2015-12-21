import {Component, Output, EventEmitter} from 'angular2/core';
import {Directory} from './directory';
import {CORE_DIRECTIVES} from 'angular2/common';
import {DirectoryService} from './directory.service';

@Component({
    selector: 'directory-tree',
    inputs: ['directories: directories', 'selectedDir: selectedDir'],
    outputs: ['updateSelected: selectedChange'],
    directives: [CORE_DIRECTIVES, DirectoryTreeCompoenent],
    providers: [DirectoryService],
    //template: '<ul><li *ngFor="#dir of directories">{{dir.name}}</li></ul>'
    templateUrl: 'app/directory-tree.html',
})
export class DirectoryTreeCompoenent {

    private updateSelected: EventEmitter<T> = new EventEmitter();

    directories:  Directory[];
    selectedDir: Directory = null;
    constructor(private _directoryService: DirectoryService) { }

    toggle(dir: Directory){
        dir.toggle();
        if (!dir.childLoaded) {
            this._directoryService.getDirectories(dir.getPathName()).then(
                (directories) => {
                    dir.setChildren(directories);
                    dir.childLoaded = true;
                    console.log(dir);
                })
        }
    }

    select(dir: Directory) {
        this.selectedDir = dir;
        console.log(dir.getName());
        this.updateSelected.emit(dir);
    }
}