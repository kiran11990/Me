import { SlaRouting } from '../sla/sla.routing';
import { HomeComponent } from './home.component';
export var HomeRoutes = [
    {
        path: 'home',
        component: HomeComponent,
        children: SlaRouting.slice()
    }
];
//# sourceMappingURL=home.routes.js.map