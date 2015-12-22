import {Injectable} from 'angular2/core';
import {FsItem, FsDirectory} from './file-system';

@Injectable()
export class DirectoryService {

    private baseUrl: string = "http://localhost:8181";

    private getDirectoryUri(endpoint:string, value?: string): string{
        var base = this.baseUrl + endpoint;
        if (!!value) {
            base += '?path=' + value;
        }
        return base;
    }

    /**
     * Simulate a slowly resposnse
     * @returns {Promise<FsDirectory>}
     */
    getDirectories(value?: string) : Promise<FsDirectory[]>{
        console.log('Directory service getDirectory');
        console.log(this.getDirectoryUri('/dir',value));
        return window.fetch(this.getDirectoryUri('/dir', value))
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
        return window.fetch(this.getDirectoryUri('/content-dir', dir.getPathName()))
            .then((result:any) => result.json())
            .then((json:any) => {
                return json.map(dir => this.parseFsItem(dir))
            });
    }
}