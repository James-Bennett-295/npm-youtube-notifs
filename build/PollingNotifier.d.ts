import { StorageInterface } from "./storage";
import { Video } from "./getChannelData";
type PollingNotifierConfig = {
    /** In minutes */
    interval: number;
    storage: StorageInterface;
};
declare class PollingNotifier {
    readonly subscriptions: string[];
    private checkInterval;
    private intervalId;
    private storage;
    onError: ((err: any) => void) | null;
    onNewVideos: ((vids: Video[]) => void) | null;
    constructor(config: PollingNotifierConfig);
    private emitError;
    private doChecks;
    isActive(): boolean;
    start(): Promise<void>;
    stop(): void;
    subscribe(channels: string[]): void;
    subscribe(channel: string): void;
    unsubscribe(channels: string[]): void;
    unsubscribe(channel: string): void;
    simulateNewVideo(properties?: Partial<Video>): void;
}
export { PollingNotifier };
