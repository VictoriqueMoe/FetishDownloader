import {ImageContainerTyping} from "Typings";
import {AjaxUtils} from "Utils";

export class FetishImage {
    private readonly _res: string;
    private readonly _url: string;
    private readonly _title: string;
    private _isInit: boolean;
    private _actualImage: Blob;

    constructor(container: ImageContainerTyping) {
        this._res = container.res;
        this._title = container.title;
        this._url = container.url;
        this._isInit = false;
    }

    public get res(): string {
        return this._res;
    }

    public get url(): string {
        return this._url;
    }


    public get title(): string {
        return this._title;
    }

    public get isInit(): boolean {
        return this._isInit;
    }

    public get image(): Blob {
        if (!this._isInit) {
            throw new Error("Image has not been loaded yet");
        }
        return this._actualImage;
    }

    public loadImage(): Promise<void> {
        if (this._isInit) {
            return Promise.resolve();
        }
        return AjaxUtils.loadXHR(this.url).then(image => {
            this._actualImage = image;
            this._isInit = true;
        });
    }
}