export interface ISoundRecorder {
    chunks: Array<Blob>;
    recorder: MediaRecorder

    start(stream: MediaStream): void;

    pause(): void;

    play(): void;

    stop(): void;

    info(): MediaRecorder;
}

class SoundRecorder implements ISoundRecorder {
    public recorder: MediaRecorder;
    public chunks: Blob[] = [];

    start(stream: MediaStream) {
        this.recorder = new MediaRecorder(stream);

        this.recorder.ondataavailable = (event: BlobEvent) => {
            const { data } = event;
            this.chunks.push(data);
            console.log(event, this.recorder.state, this.chunks);
        };

        const logger = (event: CustomEvent | MediaRecorderErrorEvent) => {
            console.log(event, this.recorder.state);
        };

        this.recorder.onstop = logger;
        this.recorder.onstart = logger;
        this.recorder.onerror = logger;
        this.recorder.onpause = logger;
        this.recorder.onresume = logger;

        this.recorder.start(1000);
    };

    stop() {
        this.recorder.stop();
        // this.recorder = null;
    }

    play() {
        return this.recorder.resume();
    }

    pause() {
        return this.recorder.pause();
    }

    info() {
        return this.recorder;
    }
}

export default SoundRecorder;
