/**
 * Smithery CLI compatible entry point
 * This wraps the existing STDIO server for local development with Smithery CLI
 */
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
export default function ({ sessionId, config }: {
    sessionId: string;
    config: any;
}): Server<{
    method: string;
    params?: {
        [x: string]: unknown;
        _meta?: {
            [x: string]: unknown;
            progressToken?: string | number | undefined;
        } | undefined;
    } | undefined;
}, {
    method: string;
    params?: {
        [x: string]: unknown;
        _meta?: {
            [x: string]: unknown;
        } | undefined;
    } | undefined;
}, {
    [x: string]: unknown;
    _meta?: {
        [x: string]: unknown;
    } | undefined;
}>;
