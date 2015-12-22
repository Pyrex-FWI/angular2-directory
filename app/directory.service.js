System.register(['angular2/core', './file-system'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, file_system_1;
    var DirectoryService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (file_system_1_1) {
                file_system_1 = file_system_1_1;
            }],
        execute: function() {
            DirectoryService = (function () {
                function DirectoryService() {
                    this.baseUrl = "http://localhost:8181";
                }
                DirectoryService.prototype.getDirectoryUri = function (endpoint, value) {
                    var base = this.baseUrl + endpoint;
                    if (!!value) {
                        base += '?path=' + value;
                    }
                    return base;
                };
                /**
                 * Simulate a slowly resposnse
                 * @returns {Promise<FsDirectory>}
                 */
                DirectoryService.prototype.getDirectories = function (value) {
                    var _this = this;
                    console.log('Directory service getDirectory');
                    console.log(this.getDirectoryUri('/dir', value));
                    return window.fetch(this.getDirectoryUri('/dir', value))
                        .then(function (result) { return result.json(); })
                        .then(function (json) {
                        return json.map(function (dir) { return _this.parseFsDir(dir); });
                    });
                };
                /**
                 *
                 * @param serverFs
                 * @returns {FsDirectory}
                 */
                DirectoryService.prototype.parseFsDir = function (serverFs) {
                    return new file_system_1.FsDirectory(serverFs);
                };
                /**
                 *
                 * @param serverFs
                 * @returns {FsItem}
                 */
                DirectoryService.prototype.parseFsItem = function (serverFs) {
                    return new file_system_1.FsItem(serverFs);
                };
                DirectoryService.prototype.getDirectoryContent = function (dir) {
                    var _this = this;
                    console.log('Directory service getDirectoryContent');
                    return window.fetch(this.getDirectoryUri('/content-dir', dir.getPathName()))
                        .then(function (result) { return result.json(); })
                        .then(function (json) {
                        return json.map(function (dir) { return _this.parseFsItem(dir); });
                    });
                };
                DirectoryService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], DirectoryService);
                return DirectoryService;
            })();
            exports_1("DirectoryService", DirectoryService);
        }
    }
});
//# sourceMappingURL=directory.service.js.map