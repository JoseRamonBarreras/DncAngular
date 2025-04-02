import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'ViewDocumentsPWAngular';

  constructor(
    private router: Router
  ){
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        console.log('NavigationStart:', event.url);
      }

      if (event instanceof NavigationEnd) {
        console.log('NavigationEnd:', event.url);
      }

      if (event instanceof NavigationError) {
        console.error('NavigationError:', event.error);
        console.log('Log NavigationError:', event.error);
      }
    });
  }
}
