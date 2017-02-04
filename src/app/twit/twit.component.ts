import { Component, OnInit, OnDestroy } from '@angular/core';
import { socketService } from '../socket.service';
import {isNullOrUndefined} from "util";

declare var socket: any;

@Component({
  selector: 'app-twit',
  templateUrl: './twit.component.html',
  styleUrls: ['./twit.component.css'],
  providers: [ socketService ]
})
export class TwitComponent implements OnInit, OnDestroy {

  tweets = [];
  media_url = '';
  connection;
  tweet;

  constructor(private socketService: socketService) { }

  ngOnInit() {
    this.connection = this.socketService.getTweets()
      .filter(data => data['extended_entities'] !== undefined)
      .subscribe(tweet => {
          ( tweet['entities']['media'][0].media_url_https !== this.media_url)
            ? this.media_url = tweet['entities']['media'][0].media_url_https
            : false
      }

      )
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
