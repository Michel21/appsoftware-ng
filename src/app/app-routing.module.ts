import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './core/auth/auth-guard.service';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'pages', loadChildren: () =>
      import('./pages/main.module').then(m => m.MainModule),
    canActivate: [AuthGuard]
  },
  { path: '**', pathMatch: "full", redirectTo: " " },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
