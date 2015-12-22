import {Component, Output, EventEmitter} from 'angular2/core';
import {FsItem} from './file-system';
import {CORE_DIRECTIVES} from 'angular2/common';
import {DirectoryService} from './directory.service';

@Component({
    selector: 'directory-tree',
    inputs: ['directories: directories', 'selectedDir: selectedDir'],
    outputs: ['updateSelected: selectedChange'],
    directives: [CORE_DIRECTIVES, DirectoryTreeCompoenent],
    providers: [DirectoryService],
    templateUrl: 'app/directory-tree.html',
})
export class DirectoryTreeCompoenent {

    private updateSelected: EventEmitter<T> = new EventEmitter();
    public directories:  FsItem[];
    public selectedDir: FsItem = null;

    constructor(private _directoryService: DirectoryService) { }

    /**
     * Toggle for expand +/-
     * Load children dir if did'not yet
     * @param dir
     */
    public toggle(dir: FsItem){
        dir.toggle();

        if (!dir.childLoaded) {
            this._directoryService.getDirectories(dir.getPathName())
            .then(
                (directories) => {
                    dir.setChildren(directories);
                    dir.childLoaded = true;
                    console.log(dir);
                }
            )
        }
    }

    /**
     *
     * @param dir
     */
    public select(dir: FsItem) {
        this.selectedDir = dir;
        console.log(dir.getName());
        this.updateSelected.emit(dir);
    }
}