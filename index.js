import Channel from './diagnostics_channel/index.js';

const channel1 = new Channel("channel-1");

const func1 = () => {
    console.log(channel1.channelName);
    // channel1.subscribe((message, name) => {
    //     console.log("I received", message, name);
    // });
}

const func2 = () => {
    console.log(channel1.channelName);
    // channel1.publish((new Date).toISOString());
    func3();
}

const func3 = () => {
    setTimeout(() => {
        func2();
    }, 100);
}

func1();
func2();
