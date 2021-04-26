import { ContentDeliveryConfig } from './config';
import { ContentData } from './models';
/**
 * Interface describing additional request parameters
 * for requesting content.
 */
export interface ContentRequest {
    /**
     * Branch of the content to request.
     */
    branch?: string;
    /**
     * Properties to include in the response.
     * All by default, unless configured differently.
     */
    select?: Array<string>;
    /**
     * Properties to expand in the response.
     * None by default, unless configured differently.
     */
    expand?: Array<string>;
}
/**
 * Interface describing additional request parameters
 * for requesting a collection of content items.
 */
export interface ContentCollectionRequest extends ContentRequest {
    /**
     * Number of content items to fetch per set.
     */
    top?: number;
    /**
     * Continuation token for fetching the next
     * set of content items.
     */
    continuationToken?: string;
}
/**
 * Type describing a content loader error.
 *
 * @typeparam T - Type of the additional error data.
 */
export declare type ContentLoaderError = {
    /**
     * HTTP status code.
     */
    errorCode?: number;
    /**
     * Message describing the error.
     */
    errorMessage?: string;
};
/**
 * Type describing a content collection.
 *
 * @typeparam T - Type of the content items.
 */
export declare type ContentCollection<T extends ContentData> = {
    /**
     * The content items.
     */
    items?: Array<T>;
    /**
     * Continuation token to fetch next set of items.
     */
    continuationToken?: string;
};
/**
 * Class for loading content.
 */
export declare class ContentLoader {
    #private;
    /**
     * Constructs an instance of ContentLoader.
     *
     * @param config - Optional configuration to use. The configuration is
     * combined with the default configuration specified in defaultConfig.
     */
    constructor(config?: Partial<ContentDeliveryConfig>);
    /**
     * Get content by an identifier.
     *
     * @param id - Identifier of the content.
     * @param request - Additional request parameters.
     * @returns A promise with a ContentData if the content was found, otherwise rejected with a ContentLoaderError.
     */
    getContent<T extends ContentData>(id: string, request?: ContentRequest): Promise<T>;
    /**
     * Get children by a parent identifier.
     *
     * @param id - Identifier of the parent content.
     * @param request - Additional request parameters.
     * @returns A promise with an array of ContentData or a ContentCollection if 'top'
     * or a 'continuationToken' is provided. Otherwise rejected with a ContentLoaderError.
     */
    getChildren<T extends ContentData>(id: string, request?: ContentCollectionRequest): Promise<Array<T> | ContentCollection<T>>;
    /**
     * Get ancestors by a parent identifier.
     *
     * @param parentId - Identifier of the content.
     * @param request - Additional request parameters.
     * @returns A promise with an array of ContentData, otherwise rejected with a ContentLoaderError.
     */
    getAncestors<T extends ContentData>(id: string, request?: ContentRequest): Promise<Array<T>>;
}
