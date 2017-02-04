/// <reference path="../typings.d.ts" />

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as io from "socket.io-client";

import { environment } from '../environments/environment';

@Injectable()
export class socketService {

    private url = environment.api_host;

    private socket;

    getTweets() {

      console.info('Socket on: ' + this.url);

        let observable = new Observable(observer => {
            this.socket = io(this.url);

            this.socket.on('tweet', (data) => {
              observer.next(data);
            });

            return () => {
              this.socket.disconnect();
            };
        })
        return observable;
    }
}
