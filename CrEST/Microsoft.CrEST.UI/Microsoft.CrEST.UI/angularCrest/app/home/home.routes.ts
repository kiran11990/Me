
import { Route } from '@angular/router';
import { SlaRouting } from '../sla/sla.routing';
import { HomeComponent } from './home.component';

export const HomeRoutes: Route[] = [
  	{
    	path: 'home',
        component: HomeComponent,
    	children: [
            ...SlaRouting
    	]
  	}
];
