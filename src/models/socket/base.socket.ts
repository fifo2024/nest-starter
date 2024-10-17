/**
 * @file wrap websocket base operation logic.
 * @author zhaoyadong<zhaoyadong@baidu.com>
 */
import WebSocket from 'faye-websocket';

class BaseSocket {
  constructor(name: string, server: any) {
    this.name = name;
    this.server = server;
    this.socket = null;
    this.identifier = null;
    this.observers = [];
  }

  name = '';
  server: any;
  socket: WebSocket;
  /**
   * 标识符
   */
  identifier: string;
  observers: BaseSocket[];

  onProcessHandShake(event) {}

  onSocketOpen(event) {
    for (const index in this.observers) {
      this.observers[index].onSocketOpen(event);
    }
  }

  onSocketMessage(event) {
    console.log('onSocketMessage::', event);
  }

  onSocketError(event) {
    console.log('onSocketError::', event);
  }

  onSocketClose(event) {
    this.socket = null;
    this.identifier = null;

    for (const index in this.observers) {
      this.observers[index].onSocketClose(event);
    }
  }

  open(req, socket, body) {
    if (WebSocket.isWebSocket(req)) {
      console.log('upgrade req header: ', req.headers);
      let subProtoList = [];
      if (req.headers['sec-websocket-protocol']) {
        const subProtoStr = req.headers['sec-websocket-protocol'].replace(
          /\s*/g,
          '',
        );
        subProtoList = subProtoStr.split(',');
      }
      console.log('dest subproto list: ', subProtoList);
      this.socket = new WebSocket(req, socket, body);
      this.socket.on('open', this.onSocketOpen.bind(this));
      this.socket.on('message', this.onSocketMessage.bind(this));
      this.socket.on('error', this.onSocketError.bind(this));
      this.socket.on('close', this.onSocketClose.bind(this));

      return true;
    } else {
      return false;
    }
  }

  send(type, message, mode = 'object') {
    if (this.socket !== null && this.socket !== undefined) {
      if (mode === 'object') {
        const messageObj: any = {};
        messageObj.type = type;
        messageObj.clientId = this.identifier;
        messageObj.content = message;
        this.socket.send(JSON.stringify(messageObj));
      } else if (mode === 'binary') {
        this.socket.send(message);
      } else if (mode === 'string') {
        const messageHead =
          '{"type":"' +
          type +
          '","clientId":"' +
          this.identifier +
          '","content":';
        const messageTail = '}';
        const messageSent = messageHead + message + messageTail;
        this.socket.send(messageSent);
      }
    } else {
    }
  }

  close(code, reasion) {
    if (this.socket !== null && this.socket !== undefined) {
      this.socket.close(code, reasion);
    } else {
    }
  }
}

export default BaseSocket;
