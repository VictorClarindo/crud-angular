import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { Cliente } from '../formulario/cliente';
import { ClienteService } from '../cliente.service';


@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [
    FlexLayoutModule, 
    FormsModule, 
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent {
  constructor(private service: ClienteService){}

  cliente: Cliente = Cliente.newUser();
  
  consultar(){
    let clientesStorage = this.service.obterStorage();

    

  }



}
