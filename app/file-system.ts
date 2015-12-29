
export class FsItem {
    private name: string;
    private pathName: string;
    private isDir: boolean;
    public selected: boolean = false;

    constructor(serverData) {
        this.name = serverData.name;
        this.pathName = serverData.pathName;
        this.isDir = serverData.isDir;
    }

    getName(): string {
        return this.name;
    }

    getPathName(): string {
        return this.pathName;
    }

}

export class FsDirectory extends FsItem {
    expanded: boolean = false;
    childLoaded: boolean = false;
    child: FsDirectory[];
    isDir: boolean =  true;


    toggle(){
        this.expanded = !this.expanded;
    }

    setChildren(child: FsDirectory[]){
        this.child = child;
    }
}