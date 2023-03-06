import { Component } from '@angular/core';

interface MenuItem {
  title: string,
  router: string,
}

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styles: [
  ]
})
export class SideMenuComponent {

  public reactiveMenu: MenuItem[] = [
    { title: 'Básicos', router: './reactive/basic' },
    { title: 'Dinamicos', router: './reactive/dynamic' },
    { title: 'Switches', router: './reactive/switches' },
  ];

  public registerMenu: MenuItem[] = [
    { title: 'Registro', router: './auth/sign-up' },
  ];

}
