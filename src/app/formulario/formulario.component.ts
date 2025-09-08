import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { Cliente } from './cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { query } from '@angular/animations';


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
export class FormularioComponent implements OnInit{
  cliente: Cliente = Cliente.newUser();
  atualizando: boolean = false;
  deletando: boolean = false;

  constructor(
    private service: ClienteService,
    private route: ActivatedRoute,
    private router: Router
   ){}

   ngOnInit(): void {
    this.route.queryParamMap.subscribe(
      (query: any) => {
        const params = query['params'];
        const id = params['id'];

        if(id){
          const clienteEncontrado = this.service.pesquisarClientePorId(id);
          if(clienteEncontrado){
            this.atualizando = true;
            this.cliente = clienteEncontrado;
          }
        }
      }
    )
   }
  
  
  salvar(){
    if(!this.atualizando){
      this.service.salvar(this.cliente);
      this.cliente = Cliente.newUser();
    } else{
      this.service.atualizar(this.cliente);
      this.router.navigate(['/consulta']);
    }
  }

  preparaDeletar(){
    this.deletando = true;
  }

  deletar(){
    this.service.deletar(this.cliente);
    this.deletando = false;
    this.router.navigate(['/consulta']);
  }

}
