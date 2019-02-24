import { Routes } from "@angular/router";

export const ROUTES: Routes = [
    { path: '', loadChildren: './administrator/administrator.module#AdministratorModule' }
]