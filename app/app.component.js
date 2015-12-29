System.register(['angular2/core', 'angular2/common', './file-system', './directory.service', './directory-tree.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, file_system_1, directory_service_1, directory_tree_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (file_system_1_1) {
                file_system_1 = file_system_1_1;
            },
            function (directory_service_1_1) {
                directory_service_1 = directory_service_1_1;
            },
            function (directory_tree_component_1_1) {
                directory_tree_component_1 = directory_tree_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_directoryService) {
                    this._directoryService = _directoryService;
                    this.title = 'Sapar TM';
                    this.selectedDir = new file_system_1.FsDirectory({ name: '', pathName: '' });
                    this.currentDirContent = [];
                    this.currentDirGenre = [];
                    this.currentDirYear = [];
                }
                AppComponent.prototype.getDirectories = function () {
                    var _this = this;
                    console.log('AppComponent::getDirectories');
                    this._directoryService.getDirectories().then(function (directories) { _this.directories = directories; });
                };
                AppComponent.prototype.getMoveStack = function () {
                    return this._directoryService.moveStack;
                };
                AppComponent.prototype.getDeleteStack = function () {
                    return this._directoryService.deleteStack;
                };
                AppComponent.prototype.ngOnInit = function () {
                    console.log('ngOnInit was called');
                    this.getDirectories();
                    this._directoryService.moveStack = Lockr.get('moveToCollection', []);
                    this._directoryService.deleteStack = Lockr.get('rmCollectionQueue', []);
                };
                AppComponent.prototype.selectDir = function (dir) {
                    var _this = this;
                    console.log('AppComponent SelectDir');
                    console.log(dir);
                    this.selectedDir = dir;
                    this._directoryService.getDirectoryContent(dir).then(function (files) {
                        _this.currentDirContent = files;
                        if (files.length > 0) {
                            _this.getDirectoryGenre(dir);
                        }
                        console.log(files);
                    });
                };
                AppComponent.prototype.getDirectoryGenre = function (dir) {
                    var _this = this;
                    this._directoryService.getDirectoryGenre(dir).then(function (data) {
                        _this.currentDirMetaData = data;
                        console.log(data);
                        _this.checkGenresAndYear();
                    });
                };
                AppComponent.prototype.getPlayLink = function (item) {
                    return this._directoryService.getStreamUri(item);
                };
                AppComponent.prototype.checkGenresAndYear = function () {
                    this.currentDirGenre = [];
                    this.currentDirYear = [];
                    for (var _i = 0, _a = this.currentDirMetaData; _i < _a.length; _i++) {
                        var track = _a[_i];
                        if (track.genre && this.currentDirGenre.indexOf(track.genre) == -1) {
                            this.currentDirGenre.push(track.genre);
                        }
                        if (track.year && track.year.length > 2 && this.currentDirYear.indexOf(track.year) == -1) {
                            this.currentDirYear.push(track.year);
                        }
                    }
                    console.log(this.currentDirGenre);
                };
                AppComponent.prototype.alreadyInStackAction = function (dir) {
                    if (this._directoryService.moveStack.indexOf(dir) > -1) {
                        return true;
                    }
                    if (this._directoryService.deleteStack.indexOf(dir) > -1) {
                        return true;
                    }
                    return false;
                };
                AppComponent.prototype.moveToDelete = function (dir) {
                    console.log('add to move');
                    this._directoryService.deleteStack.push(dir);
                    Lockr.set('rmCollectionQueue', this._directoryService.deleteStack);
                };
                AppComponent.prototype.moveToCollection = function (dir) {
                    console.log('add to collection');
                    this._directoryService.moveStack.push(dir);
                    Lockr.set('moveToCollection', this._directoryService.moveStack);
                };
                AppComponent.prototype.rmDeleteQueue = function (dir) {
                    var i = this._directoryService.deleteStack.indexOf(dir);
                    if (i > -1) {
                        this._directoryService.deleteStack.splice(i, 1);
                    }
                    Lockr.set('rmCollectionQueue', this._directoryService.deleteStack);
                };
                AppComponent.prototype.rmCollectionQueue = function (dir) {
                    var i = this._directoryService.moveStack.indexOf(dir);
                    if (i > -1) {
                        this._directoryService.moveStack.splice(i, 1);
                    }
                    Lockr.set('moveToCollection', this._directoryService.moveStack);
                };
                AppComponent.prototype.setMetaData = function () {
                    this._directoryService.applyGenreYear(this.selectedDir, this.currentDirGenre[0], this.currentDirYear[0]);
                };
                AppComponent.prototype.applyMove = function () {
                    this._directoryService.applyMove();
                };
                AppComponent.prototype.applyDelete = function () {
                    this._directoryService.applyDelete();
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'angular-app',
                        directives: [directory_tree_component_1.DirectoryTreeCompoenent, common_1.FORM_DIRECTIVES],
                        providers: [directory_service_1.DirectoryService],
                        styles: [""],
                        //template:`<h1>{{title}}</h1>--{{selectedDir.getName()}}--
                        //<directory-tree [directories]="directories" (selectedChange)="selectDir($event)"></directory-tree>`,
                        templateUrl: 'app/app.html',
                    }), 
                    __metadata('design:paramtypes', [directory_service_1.DirectoryService])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map