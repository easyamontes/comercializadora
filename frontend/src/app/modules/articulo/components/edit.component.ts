import { Component, OnInit } from '@angular/core';
import { Articulo } from './../../../models/articulo'
import { UserService } from '../../../services/user.service';
import { ArticuloService } from './../services/articulo.serice';

@Component({
    selector: 'articulo-edit',
    templateUrl: './edit.component.html',
    providers:[
        UserService,
        ArticuloService
    ]
})

export class ArticuloEditComponent implements OnInit{

    ngOnInit(){
        
    }
}