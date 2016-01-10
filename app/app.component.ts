import {Component, OnInit} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {FsItem, FsDirectory} from './file-system';
import {DirectoryService} from './directory.service';
import {DirectoryTreeCompoenent} from './directory-tree.component';
import {StripUnderscorePipe} from './pipe/strip-undescore';

@Component({
    selector: 'angular-app',
    directives: [DirectoryTreeCompoenent, FORM_DIRECTIVES],
    providers: [DirectoryService],
    styles:[``],
    //template:`<h1>{{title}}</h1>--{{selectedDir.getName()}}--
    //<directory-tree [directories]="directories" (selectedChange)="selectDir($event)"></directory-tree>`,
    templateUrl: 'app/app.html',
    pipes: [StripUnderscorePipe]

})
export class AppComponent implements OnInit{
    public title = 'Sapar TM';
    public directories: FsDirectory[] = [];
    public selectedDir:  FsDirectory = new FsDirectory({name:'', pathName:''});
    public currentDirContent: Array<T> = [];
    public currentFile: FsItem;
    public currentDirMetaData: any;
    public currentDirGenre :Array<T> = [];
    public currentDirYear :Array<T> = [];

    constructor(private _directoryService: DirectoryService) { }

    getDirectories() {
        console.log('AppComponent::getDirectories');
        this._directoryService.getDirectories().then((directories) => {this.directories = directories});
    }
    getMoveStack() {
        return this._directoryService.moveStack;
    }
    getDeleteStack() {
        return this._directoryService.deleteStack;
    }

    ngOnInit() {
        console.log('ngOnInit was called');
        this.getDirectories();
        this._directoryService.moveStack = Lockr.get('moveToCollection', []);
        this._directoryService.deleteStack = Lockr.get('rmCollectionQueue', []);
    }

    selectDir(dir) {
        console.log('AppComponent SelectDir');
        console.log(dir);
        this.selectedDir = dir;
        this._directoryService.getDirectoryContent(dir).then(
            (files) => {
                this.currentDirContent = files;
                if (files.length > 0) {
                    this.getDirectoryGenre(dir);
                }
                console.log(files);
            });
    }

    getDirectoryGenre(dir) :void {
        this._directoryService.getDirectoryGenre(dir).then(
            (data) => {
                this.currentDirMetaData = data;
                console.log(data);
                this.checkGenresAndYear();
            }
        );
    }
    public getPlayLink(item:FsItem) :string {
        return this._directoryService.getStreamUri(item);
    }

    public checkGenresAndYear(): void {
        this.currentDirGenre = [];
        this.currentDirYear = [];
        for(var track of this.currentDirMetaData) {
            if (track.genre && this.currentDirGenre.indexOf(track.genre) == -1) {
                this.currentDirGenre.push(track.genre);
            }
            if (track.year && track.year.length > 2 && this.currentDirYear.indexOf(track.year) == -1) {
                this.currentDirYear.push(track.year);
            }
        }
        console.log(this.currentDirGenre);
    }

    public alreadyInStackAction( dir: FsDirectory) {
        if (this._directoryService.moveStack.indexOf(dir) > -1) {
            return true;
        }

        if (this._directoryService.deleteStack.indexOf(dir) > -1) {
            return true;
        }

        return false;
    }

    public moveToDelete(dir:FsDirectory) : void {
        console.log('add to move');
        this._directoryService.deleteStack.push(dir);
        Lockr.set('rmCollectionQueue', this._directoryService.deleteStack);
    }

    public moveToCollection(dir:FsDirectory) : void {
        console.log('add to collection');
        this._directoryService.moveStack.push(dir);
        Lockr.set('moveToCollection', this._directoryService.moveStack);
    }

    public rmDeleteQueue(dir: FsDirectory) : void {
        var i = this._directoryService.deleteStack.indexOf(dir);
        if (i > -1) {
            this._directoryService.deleteStack.splice(i, 1);
        }
        Lockr.set('rmCollectionQueue', this._directoryService.deleteStack);
    }
    public rmCollectionQueue(dir: FsDirectory) : void {
        var i = this._directoryService.moveStack.indexOf(dir);
        if (i > -1) {
            this._directoryService.moveStack.splice(i, 1);
        }
        Lockr.set('moveToCollection', this._directoryService.moveStack);
    }

    public setMetaData() :void {
        this._directoryService.applyGenreYear(this.selectedDir, this.currentDirGenre[0], this.currentDirYear[0]);
    }

    public applyMove(): void {
        this._directoryService.applyMove();
    }

    public applyDelete(): void {
        this._directoryService.applyDelete();
    }

}