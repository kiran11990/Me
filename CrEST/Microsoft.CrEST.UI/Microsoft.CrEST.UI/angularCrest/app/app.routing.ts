
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeRoutes } from "./home/home.routes";
import { NotFoundComponent } from './notfound/notfound.component';
import { NavigationComponent } from './navbar/navbar.component';
import { LoginComponent } from "./Authentication/login/login.component";
import { RegisterComponent } from "./Authentication/Register/register.component";
import { SlaRouting } from './sla/sla.routing';
const appRoutes: Routes = [
	...HomeRoutes,
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'not-found', component: NotFoundComponent },
	{ path: '**', redirectTo: 'not-found' }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
