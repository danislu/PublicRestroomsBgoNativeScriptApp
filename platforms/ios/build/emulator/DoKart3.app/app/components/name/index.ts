import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'nameit',
    templateUrl: './name.xml'
})
export class NameComponent {
    public firstName: string = 'John';
    public lastName: string = 'Doe';

    constructor(private router: Router) {}

    click() : void {
        //alert(`${this.firstName} ${this.lastName}`);
        
        this.router.navigate(['/map']);
    }
}