System.register(['angular2/core', 'angular2/common'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1;
    var DirectoryTreeCompoenent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            DirectoryTreeCompoenent = (function () {
                function DirectoryTreeCompoenent() {
                    this.selectedDir = null;
                }
                DirectoryTreeCompoenent.prototype.select = function (dir) {
                    this.selectedDir = dir;
                    console.log(dir);
                };
                DirectoryTreeCompoenent = __decorate([
                    core_1.Component({
                        selector: 'directory-tree',
                        inputs: ['directories: directories', 'selectedDir: selectedDir'],
                        directives: [common_1.CORE_DIRECTIVES],
                        //template: '<ul><li *ngFor="#dir of directories">{{dir.name}}</li></ul>'
                        templateUrl: 'app/directory-tree.html',
                    }), 
                    __metadata('design:paramtypes', [])
                ], DirectoryTreeCompoenent);
                return DirectoryTreeCompoenent;
            })();
            exports_1("DirectoryTreeCompoenent", DirectoryTreeCompoenent);
        }
    }
});
//# sourceMappingURL=directory-tree.component.js.map