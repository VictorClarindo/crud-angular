import { Component, inject, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Cliente } from './cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrasilapiService } from '../brasilapi.service';
import { Estado, Municipio } from '../brasilapi.models';
import { Subscriber } from 'rxjs';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule, 
    FormsModule, 
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule
  ],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export class FormularioComponent implements OnInit{
  cliente: Cliente = Cliente.newUser();
  atualizando: boolean = false;
  private snack: MatSnackBar = inject(MatSnackBar);
  estados: Estado[] = [];
  municipios?: Municipio[];

  constructor(
    private service: ClienteService,
    private route: ActivatedRoute,
    private router: Router,
    private brasilApiService: BrasilapiService,
     
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
            if(this.cliente.uf){
              const event = {value: this.cliente.uf};
              this.carregarMunicipios(event as MatSelectChange);
            }
          }
        }
      }
    )
    this.carregarUF();
   }
  
  
  salvar(){
    if(!this.atualizando){
      this.service.salvar(this.cliente);
      this.cliente = Cliente.newUser();
    } else{
      this.service.atualizar(this.cliente);
    }
    this.router.navigate(['/consulta']);
    this.mostrarSnackBar("Cliente salvo com sucesso!")
  }
  
  deletar(){
    this.service.deletar(this.cliente);
    this.cliente.deletando = false;
    this.router.navigate(['/consulta']);
    this.mostrarSnackBar("Cliente deletado com sucesso!")
  }

  mostrarSnackBar(mensagem: string){
    this.snack.open(mensagem, "ok");
  }

  carregarUF(){
    this.brasilApiService.listarUFs().subscribe({
      next: listaEstados => this.estados = listaEstados,
      error: erro => console.log("Ocorreu um erro: ", erro)
    })
  }

  carregarMunicipios(event: MatSelectChange){
    const ufSelecionada: string = event.value;
    this.brasilApiService.listarMunicipios(ufSelecionada).subscribe({
      next: listaMunicipios => 
        this.municipios = listaMunicipios,
      error: erro => console.log("ocorreu um erro:", erro )
    })
  }
}
