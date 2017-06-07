import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './notfound/notfound.component';
import { LoginComponent } from '../Authentication/login/login.component';
import { RegisterComponent } from '../Authentication/Register/register.component';
import { slaRoutes } from './sla/sla.routing';
var appRoutes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    //{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    {
        path: 'home', component: HomeComponent, children: slaRoutes
    },
    // { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: 'not-found' }
];
export var Routing = RouterModule.forRoot(appRoutes, { useHash: true });
//# sourceMappingURL=app.routing.js.map