/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { socketService } from './socket.service';

describe('SocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [socketService]
    });
  });

  it('should ...', inject([socketService], (service: socketService) => {
    expect(service).toBeTruthy();
  }));
});
