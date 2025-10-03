import type { ValoriaEventEmitter } from '../Types';
/**
 * Captures events from a valoria event emitter & stores them in a file
 * @param ev The event emitter to read events from
 * @param filename File to save to
 */
export declare const captureEventStream: (ev: ValoriaEventEmitter, filename: string) => void;
/**
 * Read event file and emit events from there
 * @param filename filename containing event data
 * @param delayIntervalMs delay between each event emit
 */
export declare const readAndEmitEventStream: (filename: string, delayIntervalMs?: number) => {
    ev: ValoriaEventEmitter;
    task: Promise<void>;
};
