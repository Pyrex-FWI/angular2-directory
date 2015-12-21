
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

    toggle(){
        this.expanded = ! this.expanded;
        this.loadChildren();
    }

    loadChildren(){

    }
}