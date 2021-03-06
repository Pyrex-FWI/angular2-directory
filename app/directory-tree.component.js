System.register(['angular2/core', 'angular2/common', './directory.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, directory_service_1;
    var DirectoryTreeCompoenent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (directory_service_1_1) {
                directory_service_1 = directory_service_1_1;
            }],
        execute: function() {
            DirectoryTreeCompoenent = (function () {
                function DirectoryTreeCompoenent(_directoryService) {
                    this._directoryService = _directoryService;
                    this.updateSelected = new core_1.EventEmitter();
                    this.selectedDir = null;
                }
                /**
                 * Toggle for expand +/-
                 * Load children dir if did'not yet
                 * @param dir
                 */
                DirectoryTreeCompoenent.prototype.toggle = function (dir) {
                    dir.toggle();
                    if (!dir.childLoaded) {
                        this._directoryService.getDirectories(dir.getPathName())
                            .then(function (directories) {
                            dir.setChildren(directories);
                            dir.childLoaded = true;
                            console.log(dir);
                        });
                    }
                };
                /**
                 *
                 * @param dir
                 */
                DirectoryTreeCompoenent.prototype.select = function (dir) {
                    if (this.selectedDir) {
                        this.selectedDir.selected = false;
                    }
                    this.selectedDir = dir;
                    dir.selected = true;
                    console.log(dir.getName());
                    this.updateSelected.emit(dir);
                };
                DirectoryTreeCompoenent = __decorate([
                    core_1.Component({
                        selector: 'directory-tree',
                        inputs: ['directories: directories', 'selectedDir: selectedDir'],
                        outputs: ['updateSelected: selectedChange'],
                        styleUrls: ['app/directory-tree.css'],
                        directives: [common_1.CORE_DIRECTIVES, DirectoryTreeCompoenent],
                        providers: [directory_service_1.DirectoryService],
                        templateUrl: 'app/directory-tree.html',
                    }), 
                    __metadata('design:paramtypes', [directory_service_1.DirectoryService])
                ], DirectoryTreeCompoenent);
                return DirectoryTreeCompoenent;
            })();
            exports_1("DirectoryTreeCompoenent", DirectoryTreeCompoenent);
        }
    }
});
//# sourceMappingURL=directory-tree.component.js.map