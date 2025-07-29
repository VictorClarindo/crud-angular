import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { Cliente } from './cliente';
import { ClienteService } from '../cliente.service';


@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [
    FlexLayoutModule, 
    FormsModule, 
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export class FormularioComponent {

  constructor(private service: ClienteService ){}
  
  cliente: Cliente = Cliente.newUser();
  
  salvar(){
    this.service.salvar(this.cliente);
  }



}
