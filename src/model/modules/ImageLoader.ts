import {FetishImage} from "../impl/FetishImage";
import {Main} from "../../Main";
import {delay, ObjectUtil} from "../../utils/Utils";

export module ImageLoader {
    export let isBatch: boolean;
    export let batch: FetishImage[];
    let _pause: boolean = false;
    let _pauseDelayUid: number = -1;

    export async function loadImages(_images: FetishImage[], batchLimit: number): Promise<void> {
        let count = 0;
        isBatch = _images.length > batchLimit;
        batch = [];
        let failCount: Map<FetishImage, number> = new Map();
        let batchNum: number = 0;

        async function inner(images: FetishImage[], count: number): Promise<void> {
            let failedImages: FetishImage[] = [];
            for (let im of images) {
                if (!im.isInit) {
                    try {
                        count++;
                        await doPause();
                        await delay(50);
                        await im.loadImage();
                        Main.setLabel(`${count} out of ${images.length} done`);
                        if (isBatch) {
                            batch.push(im);
                            if (count % batchLimit === 0) {
                                batchNum++;

                                let ofString = Math.floor(Math.round(images.length / batchLimit));

                                if (images.length % batchLimit != 0) {
                                    ofString++;
                                }
                                let ofStr: string = String(ofString);

                                await Main.doDownloadZip(batch, `${batchNum} of ${ofStr}`);
                                let leftToDownload = images.length - count;
                                if (leftToDownload < 15) {
                                    Main.setLabel("5 second Cool down after download, Please accept the download request");
                                    await delay(5000);
                                    Main.setLabel(`${count} out of ${images.length} done`);
                                }
                                for (let i: number = 0; i < batch.length; i++) {
                                    batch[i].unloadImage();
                                }
                                batch = [];
                            }
                        }
                    } catch (e) {
                        failedImages.push(im);
                        let failcount = -1;
                        if (failCount.has(im)) {
                            let failNum = failCount.get(im);
                            failCount.set(im, failNum++);
                            failcount = failCount.get(im);
                        } else {
                            failCount.set(im, 0);
                        }
                        if (failcount > 5) {
                            ObjectUtil.removeObjectFromArray(im, failedImages);
                        } else {
                            await delay(4000);
                        }
                    }
                }
            }
            if (failedImages.length > 0) {
                count = 0;
                Main.setLabel("Re-retrying failed images...");
                await inner(failedImages, count);
                failedImages = [];
            }
        }

        return inner(_images, count);
    }

    function doPause(): Promise<void> {
        return new Promise(resolve => {
            if (_pauseDelayUid > -1) {
                window.clearTimeout(_pauseDelayUid);
                _pauseDelayUid = -1;
            }
            if (_pause) {
                _pauseDelayUid = window.setTimeout(resolve, Number.MAX_SAFE_INTEGER);
            } else {
                resolve();
            }
        });
    }

    export function setPuase(pause: boolean): void {
        _pause = pause;
    }
}