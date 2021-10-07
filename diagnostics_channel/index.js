import * as diagnostics_channel from 'diagnostics_channel';
import { isNonEmptyString } from './utility.js';

const preCheck = (channelName) => {
    if(isNonEmptyString(channelName)) {
        return new Error('Channel name can not be empty');
    }
}
const channel = (channelName) => {
    preCheck(channelName);
    diagnostics_channel.channel(channelName);

}

const hasSubscribers = (channelName) => {
    preCheck(channelName);
    return diagnostics_channel.channel(channelName).hasSubscribers;
}

const subscribe = (channelName, cb) => {
    diagnostics_channel.channel(channelName).subscribe((message, name) => {
        cb(message, name);
    })
}
const publish = (channelName, data) => {
    preCheck(channelName);
    diagnostics_channel.channel(channelName).publish(data);
}

export {
    channel,
    hasSubscribers,
    subscribe,
    publish
}