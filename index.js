import { channel, subscribe, publish } from './diagnostics_channel/index.js';

const ch1 = channel("channel-1");

const func1 = () => {
    subscribe("channel-1", (message, name) => {
        console.log("I received", message, name);
    });
}

const func2 = () => {
    publish("channel-1", (new Date).toISOString());
    func3();
}

const func3 = () => {
    setTimeout(() => {
        func2();
    }, 100);
}

func1();
func2();
