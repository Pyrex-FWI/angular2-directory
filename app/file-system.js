System.register([], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var FsItem, FsDirectory;
    return {
        setters:[],
        execute: function() {
            FsItem = (function () {
                function FsItem(serverData) {
                    this.selected = false;
                    this.name = serverData.name;
                    this.pathName = serverData.pathName;
                    this.isDir = serverData.isDir;
                }
                FsItem.prototype.getName = function () {
                    return this.name;
                };
                FsItem.prototype.getPathName = function () {
                    return this.pathName;
                };
                return FsItem;
            })();
            exports_1("FsItem", FsItem);
            FsDirectory = (function (_super) {
                __extends(FsDirectory, _super);
                function FsDirectory() {
                    _super.apply(this, arguments);
                    this.expanded = false;
                    this.childLoaded = false;
                    this.isDir = true;
                }
                FsDirectory.prototype.toggle = function () {
                    this.expanded = !this.expanded;
                };
                FsDirectory.prototype.setChildren = function (child) {
                    this.child = child;
                };
                return FsDirectory;
            })(FsItem);
            exports_1("FsDirectory", FsDirectory);
        }
    }
});
//# sourceMappingURL=file-system.js.map