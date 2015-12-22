import {Component, OnInit} from 'angular2/core';
import {FsItem, FsDirectory} from './file-system';
import {DirectoryService} from './directory.service';
import {DirectoryTreeCompoenent} from './directory-tree.component';

@Component({
    selector: 'angular-app',
    directives: [DirectoryTreeCompoenent],
    providers: [DirectoryService],
    styles:[``],
    //template:`<h1>{{title}}</h1>--{{selectedDir.getName()}}--
    //<directory-tree [directories]="directories" (selectedChange)="selectDir($event)"></directory-tree>`,
    templateUrl: 'app/app.html',

})
export class AppComponent implements OnInit{
    public title = 'Sapar TM';
    public directories: FsDirectory[];
    public selectedDir:  FsDirectory = new FsDirectory({name:'', pathName:''});
    public curentDirContent: any;

    constructor(private _directoryService: DirectoryService) { }

    getDirectories() {
        console.log('AppComponent::getDirectories');
        this._directoryService.getDirectories().then((directories) => {this.directories = directories});
    }

    ngOnInit() {
        console.log('ngOnInit was called');
        this.getDirectories();
    }

    selectDir(dir) {
        console.log('AppComponent SelectDir');
        console.log(dir);
        this.selectedDir = dir;
        this._directoryService.getDirectoryContent(dir).then(
            (files) => {
                this.curentDirContent = files;
                console.log(files);
            });
    }
}