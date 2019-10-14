import SoundRecorder, { ISoundRecorder } from '~/services/SoundRecorder';
import * as React from 'react';

interface IMicContainerState {
    recorder: ISoundRecorder;
}

class MicContainer extends React.Component<any, IMicContainerState> {
    constructor(props: any) {
        super(props);

        this.state = {
            recorder: new SoundRecorder(),
        };
    }

    async componentDidMount(): Promise<void> {
        if (!window.navigator) return;

        const { recorder } = this.state;
        const audioStream = await window.navigator.mediaDevices.getUserMedia({ audio: true });
        recorder.start(audioStream);
    }

    handlerRecorder = () => {
        const { recorder } = this.state;
        const { state, ...info } = recorder.info();
        console.log(state, info);

        if (state === 'recording') {
           return recorder.stop();
        }
        return recorder.play();
    };

    render() {
        return (
            <div id="container" onClick={ this.handlerRecorder }>
                <div id="micro">&nbsp;</div>
            </div>
        );
    }
}

export default MicContainer;
