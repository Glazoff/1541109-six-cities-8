import {commentsForAdapterType, commentForAdapterType, commentsType} from '../types/comment';
import {parseComment} from './parse-comment';

export const parseComments = (commentsPars: commentsForAdapterType): commentsType => commentsPars.map((commentParse: commentForAdapterType) => parseComment(commentParse));

