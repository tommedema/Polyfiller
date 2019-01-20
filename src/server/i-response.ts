// tslint:disable:no-any

import {ContentEncodingKind} from "../encoding/content-encoding-kind";

export interface IResponse {
	statusCode: number;
	cacheControl?: string;
	polyfillsHeader?: string;
}

export interface IOKResponse extends IResponse {
	contentType: string;
	contentEncoding?: ContentEncodingKind;
	body: any;
	checksum: string;
}

export interface INotModifiedResponse extends IResponse {}

export declare type Response = IOKResponse | INotModifiedResponse;
