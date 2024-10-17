/**
 * @file wrap server socket observer common logic.
 * @author zhaoyadong<zhaoyadong@baidu.com>
 */

class BaseSocketObserver {
  constructor(observerName) {
    this.observerName = observerName;
    this.socketInstance = null;
  }

  observerName: string = '';
  socketInstance: BaseSocketObserver;

  onSocketOpen(event, socketInstance) {
    this.socketInstance = socketInstance;
  }

  onSocketMessage(event) {

  }

  onSocketClose(event, socketInstance) {
    this.socketInstance = socketInstance;
  }

  setSocket(socketInstance) {
    this.socketInstance = socketInstance;
  }
}

export default BaseSocketObserver;