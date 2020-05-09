export interface UI {

    /**
     * Should create 2 elements with the id of:
     * fetishAnchor - this will be the thing clicked to kick off the download
     * fetishDownloadOptions - This will be used to call the Options for said download
     */
    buildUI(): void;
}

