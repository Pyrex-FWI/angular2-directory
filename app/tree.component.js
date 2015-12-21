System.register([], function(exports_1) {
    var TreeView;
    return {
        setters:[],
        execute: function() {
            TreeView = (function () {
                function TreeView() {
                    //directories: Array<Directory>;
                    this.directories = [new Directory('Test')];
                    this.selectedDir = null;
                    this.debug = JSON.stringify(this.directories);
                }
                TreeView.prototype.select = function (dir) {
                    this.selectedDir = dir;
                    console.log(dir);
                };
                return TreeView;
            })();
            exports_1("TreeView", TreeView);
        }
    }
});
//# sourceMappingURL=tree.component.js.map