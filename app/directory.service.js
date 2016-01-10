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
                    this.baseUrl = "http://sapar/audio_api/web";
                    this.moveStack = [];
                    this.deleteStack = [];
                }
                DirectoryService.prototype.getDirectoryUri = function (endpoint, value) {
                    var base = this.baseUrl + endpoint;
                    if (!!value) {
                        base += '?path=' + value;
                    }
                    return base;
                };
                DirectoryService.prototype.getStreamUri = function (item) {
                    return 'http://sapar/audio_api/web/stream?file=' + item.getPathName();
                };
                /**
                 * Simulate a slowly resposnse
                 * @returns {Promise<FsDirectory>}
                 */
                DirectoryService.prototype.getDirectories = function (value) {
                    var _this = this;
                    console.log('Directory service getDirectory');
                    console.log(this.getDirectoryUri('/directory', value));
                    return window.fetch(this.getDirectoryUri('/directory', value))
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
                    return window.fetch(this.getDirectoryUri('/directory/content', dir.getPathName()))
                        .then(function (result) { return result.json(); })
                        .then(function (json) {
                        return json.map(function (dir) { return _this.parseFsItem(dir); });
                    });
                };
                /**
                 *
                 * @param dir
                 * @returns {any}
                 */
                DirectoryService.prototype.getDirectoryGenre = function (dir) {
                    console.log('Directory service getDirectoryContent');
                    return window.fetch(this.getDirectoryUri('/directory/genre', dir.getPathName()))
                        .then(function (result) { return result.json(); });
                };
                DirectoryService.prototype.applyGenreYear = function (dir, genre, year) {
                    console.log(genre);
                    console.log(year);
                    url = this.baseUrl + '/directory/set-metadata?path=' + dir.getPathName() + '&g=' + genre + '&y=' + year;
                    return window.fetch(url, {
                        mode: 'no-cors'
                    });
                };
                DirectoryService.prototype.applyMove = function () {
                    var _this = this;
                    if (this.moveStack.length === 0) {
                        return;
                    }
                    dir = this.moveStack.shift();
                    console.log(dir);
                    //url = this.baseUrl + '/move?path='+dir.pathName;
                    url = this.baseUrl + '/directory/move?path=' + dir.pathName;
                    console.log(url);
                    window.fetch(url, {
                        mode: 'no-cors'
                    })
                        .then(function (result) { return console.log(result.json()); })
                        .then(function (json) {
                        console.log(json);
                        if (_this.moveStack.length > 0) {
                            return _this.applyMove();
                        }
                    });
                    Lockr.set('moveToCollection', this.moveStack);
                };
                DirectoryService.prototype.applyDelete = function () {
                    var _this = this;
                    if (this.deleteStack.length === 0) {
                        return;
                    }
                    dir = this.deleteStack.shift();
                    //console.log(dir);
                    url = "http://sapar/audio_api/web/directory/delete?path=" + dir.pathName;
                    //console.log(url);
                    window.fetch(url, {
                        mode: 'no-cors'
                    })
                        .then(function (json) {
                        if (_this.deleteStack.length > 0) {
                            return _this.applyDelete();
                        }
                    });
                    Lockr.set('rmCollectionQueue', this.deleteStack);
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