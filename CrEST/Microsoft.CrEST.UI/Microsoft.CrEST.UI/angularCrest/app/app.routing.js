import { RouterModule } from '@angular/router';
import { HomeRoutes } from "./home/home.routes";
import { NotFoundComponent } from './notfound/notfound.component';
import { LoginComponent } from "./Authentication/login/login.component";
import { RegisterComponent } from "./Authentication/Register/register.component";
var appRoutes = HomeRoutes.concat([
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: 'not-found' }
]);
export var Routing = RouterModule.forRoot(appRoutes, { useHash: true });
//# sourceMappingURL=app.routing.js.map