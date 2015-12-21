
export class Directory {
    private name: string;
    private pathName: string;
    expanded: boolean = false;
    childLoaded: boolean = false;
    child: Directory[];

    constructor(serverData) {
        this.name = serverData.name;
        this.pathName = serverData.pathName;
    }

    getName(): string {
        return this.name;
    }

    getPathName(): string {
        return this.pathName;
    }

    toggle(){
        this.expanded = !this.expanded;
    }

    setChildren(child: Directory[]){
        this.child = child;
    }
}