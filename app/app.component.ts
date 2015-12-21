import {Component, OnInit} from 'angular2/core';
import {Directory} from './directory';
import {DirectoryService} from './directory.service';
import {DirectoryTreeCompoenent} from './directory-tree.component';

@Component({
    selector: 'angular-app',
    directives: [DirectoryTreeCompoenent],
    providers: [DirectoryService],
    styles:[``],
    template:`<h1>{{title}}</h1>
    <directory-tree [directories]="directories" [selectedDir]="selectedDir"></directory-tree>`
})
export class AppComponent implements OnInit{
    public title = 'Tour of Heroes';
    public directories: Directory[];
    public selectedDir: Directory;

    constructor(private _directoryService: DirectoryService) { }

    getDirectories() {
        console.log('AppComponent::getDirectories');
        this._directoryService.getDirectories().then((directories) => {this.directories = directories});
    }

    ngOnInit() {
        console.log('ngOnInit was called');
        this.getDirectories();
    }
}