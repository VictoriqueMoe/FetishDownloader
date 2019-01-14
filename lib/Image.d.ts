import { ImageContainerTyping } from "Typings";
export declare class Image {
    private _res;
    private _containerUrl;
    private _title;
    private _hasBiggerSize;
    private _isInit;
    private _actualImage;
    constructor(container: ImageContainerTyping);
    res: string;
    containerUrl: string;
    title: string;
    hasBiggerSize: boolean;
    isInit: boolean;
    loadImage(): Promise<void>;
}
