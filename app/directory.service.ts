import {Injectable} from 'angular2/core';
import {FsItem, FsDirectory} from './file-system';

@Injectable()
export class DirectoryService {

    private baseUrl: string = "http://sapar/audio_api/web";

    public moveStack = [];
    public deleteStack = [];

    private getDirectoryUri(endpoint:string, value?: string): string{
        var base = this.baseUrl + endpoint;
        if (!!value) {
            base += '?path=' + value;
        }
        return base;
    }

    public getStreamUri(item:FsItem): string {
        return 'http://sapar/audio_api/web/stream?file=' + item.getPathName();
    }

    /**
     * Simulate a slowly resposnse
     * @returns {Promise<FsDirectory>}
     */
    getDirectories(value?: string) : Promise<FsDirectory[]>{
        console.log('Directory service getDirectory');
        console.log(this.getDirectoryUri('/directory',value));
        return window.fetch(this.getDirectoryUri('/directory', value))
            .then((result:any) => result.json())
            .then((json:any) => {
                return json.map(dir => this.parseFsDir(dir))
            });
    }

    /**
     *
     * @param serverFs
     * @returns {FsDirectory}
     */
    parseFsDir(serverFs) : FsDirectory {
        return new FsDirectory(serverFs);
    }

    /**
     *
     * @param serverFs
     * @returns {FsItem}
     */
    parseFsItem(serverFs) : FsItem {
        return new FsItem(serverFs);
    }

    getDirectoryContent(dir: FsItem): Promise<FsItem> {
        console.log('Directory service getDirectoryContent');
        return window.fetch(this.getDirectoryUri('/directory/content', dir.getPathName()))
            .then((result:any) => result.json())
            .then((json:any) => {
                return json.map(dir => this.parseFsItem(dir))
            });
    }

    /**
     *
     * @param dir
     * @returns {any}
     */
    getDirectoryGenre(dir: FsItem): Promise<FsItem> {
        console.log('Directory service getDirectoryContent');
        return window.fetch(this.getDirectoryUri('/directory/genre', dir.getPathName()))
            .then((result:any) => result.json());
    }

    applyGenreYear(dir: FsItem, genre, year): void {
        console.log(genre);
        console.log(year);
        url = this.baseUrl + '/directory/set-metadata?path='+dir.getPathName()+'&g='+genre+'&y='+year;
        return window.fetch(url,  {
            mode: 'no-cors'
        });
    }

    applyMove():void {
        if (this.moveStack.length === 0) {
            return;
        }
        dir = this.moveStack.shift();
        console.log(dir);
        //url = this.baseUrl + '/move?path='+dir.pathName;
        url = this.baseUrl + '/directory/move?path='+dir.pathName;
        console.log(url);
        window.fetch(url,  {
            mode: 'no-cors'
        })
        .then((result:any) => console.log(result.json()))
        .then((json:any) => {
            console.log(json);
            if (this.moveStack.length > 0) {
                return this.applyMove();
            }
        });
        Lockr.set('moveToCollection', this.moveStack);
    }

    applyDelete():void {
        if (this.deleteStack.length === 0) {
            return;
        }
        dir = this.deleteStack.shift();
        //console.log(dir);
        url = "http://sapar/audio_api/web/directory/delete?path="+dir.pathName;
        //console.log(url);
        window.fetch(url,  {
                mode: 'no-cors'
            })
            .then((json:any) => {
                if (this.deleteStack.length > 0) {
                    return this.applyDelete();
                }
            });
        Lockr.set('rmCollectionQueue', this.deleteStack);

    }
}