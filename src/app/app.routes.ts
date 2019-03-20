import { Routes } from "@angular/router";

export const ROUTES: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'admin', loadChildren: './administrator/administrator.module#AdministratorModule' },
    { path: 'public', loadChildren: './public/public.module#PublicModule' },
    { path: 'user', loadChildren: './user/user.module#UserModule' }
]