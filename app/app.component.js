System.register(['angular2/core', './directory.service', './directory-tree.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, directory_service_1, directory_tree_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
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
                    this.title = 'Tour of Heroes';
                }
                AppComponent.prototype.getDirectories = function () {
                    var _this = this;
                    console.log('AppComponent::getDirectories');
                    this._directoryService.getDirectories().then(function (directories) { _this.directories = directories; });
                };
                AppComponent.prototype.ngOnInit = function () {
                    console.log('ngOnInit was called');
                    this.getDirectories();
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'angular-app',
                        directives: [directory_tree_component_1.DirectoryTreeCompoenent],
                        providers: [directory_service_1.DirectoryService],
                        styles: [""],
                        template: "<h1>{{title}}</h1>\n    <directory-tree [directories]=\"directories\" [selectedDir]=\"selectedDir\"></directory-tree>"
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