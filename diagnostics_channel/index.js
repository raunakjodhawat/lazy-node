// WIP
import * as diagnostics_channel from 'diagnostics_channel';
import { isNonEmptyString } from './utility.js';

export default class Channel {
    constructor(channelName) {
        if(isNonEmptyString(channelName)) {
            return new Error('Channel name can not be empty');
        }
        this.channelName = channelName;
        this.ch = diagnostics_channel.channel(channelName);
    }

    hasSubscribers = () => {
        return this.ch.hasSubscribers;
    }

    subscribe = (cb) => {
        this.ch.subscribe((message, name) => {
            cb(message, name);
        })
    }

    publish = (data) => {
        this.ch.publish(data);
    }
}
