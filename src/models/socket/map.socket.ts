/**
 * @file wrap map socket operation logic.
 * @author zhaoyadong<zhaoyadong@baidu.com>
 */
import BaseSocket from "./base.socket";

// const WebCommandProcessor = require('../route/rpc/web_command_processor');

class MapSocket extends BaseSocket {
  constructor(server) {
    super('mapsocket', server);
    this.fileTag = 'map_data_socket';
  }

  fileTag: string = '';

  onProcessHandShake(event) {
    this.identifier = event.clientId;
    this.send('handshake', {'message': 'recv hello rpc'});
  }

  onSocketMessage(event) {
    let msgContent = JSON.parse(event.data);
    if (msgContent.type === 'handshake') {
      this.onProcessHandShake(msgContent);
    } else if (msgContent.type === 'talk') {
      for (let index in this.observers) {
        this.observers[index].onSocketMessage(msgContent);
      }
    }
  }

  observe() {
    // let observer = new WebCommandProcessor('localhost:8569');
    // observer.loadProto('web_command.proto');
    // observer.setSocket(this);
    // this.observers.push(observer);
  }
}

module.exports = MapSocket;