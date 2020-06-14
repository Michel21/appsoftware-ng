import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './core/auth/user';
import { IMenu } from './interface/IMenu';
import { AuthService } from './core/auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'appsoftware';
  authenticated$: Observable<boolean>;
  user$: Observable<User>;
  menu: Array<IMenu> = new Array<IMenu>();
  rota;
  activeItem: 100;
  rotaTrue = false;
  public appPages = [
    {
      id: 0,
      title: "Departamento",
      url: "pages/departments",
      icon: "category"
    },
    {
      id: 1,
      title: "Produto",
      url: "pages/products",
      icon: "shopping_bag"
    }
  ];
  constructor(
    private authService: AuthService,
    private router: Router) {
    this.authenticated$ = this.authService.isAuthenticated();
    this.user$ = this.authService.getUser();
  }
  ngOnInit(): void {

    this.menu.push({
      group: 'Menu',
      items: [
        { icon: 'home', label: 'Home', url: '/' },
        { icon: 'person', label: 'Pessoa', url: 'pages/people' },
        { icon: 'shopping_cart', label: 'Produtos', url: 'pages/products' },
        { icon: 'folder_special', label: 'Documentos', url: 'pages/departments' },
      ]
    });

    // this.menu.push({
    //   group: 'Pessoas',
    //   items: [
    //     { icon: 'person', label: 'Profissionais', url: '/ServiceProviders' },
    //     { icon: 'person_pin', label: ' Clientes', url: '/Customers' },
    //   ]
    // });

    // this.menu.push({
    //   group: 'Segurança',
    //   items: [
    //     { icon: 'security', label: 'Usuários', url: '/Users' }
    //   ]
    // });

    // this.menu.push({
    //   group: 'Gerenciamento',
    //   items: [
    //     { icon: 'format_list_bulleted', label: 'Pedidos', url: '/' }
    //   ]
    // });

  }
  setActiveItem(page) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.rota = event.url;
        if (this.rota === "/") {
          this.rotaTrue = true;
          return (this.activeItem = page);
        }
        if (this.rota === "pages/product") {
          this.rotaTrue = true;
          return (this.activeItem = page);
        }
        this.activeItem = 100;
        this.rotaTrue = false;
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
