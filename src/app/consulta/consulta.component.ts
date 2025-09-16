import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { Cliente } from '../formulario/cliente';
import { ClienteService } from '../cliente.service';
import { Router } from '@angular/router';
import { query } from '@angular/animations';
import { CpfFormatPipe } from "../cpf-format.pipe";


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
    MatTableModule,
    CommonModule,
    CpfFormatPipe
],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit{
  constructor(
    private service: ClienteService,
    private router: Router
  ){}

  listaClientes: Cliente[] = [];
  colunasTable: string[] = ["nome", "cpf", "cidade", "email", "acoes"]
  nomeBusca: string = '';
  private snack: MatSnackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.listaClientes = this.service.pesquisarClientes('');
  }

  pesquisar(){
    this.listaClientes = this.service.pesquisarClientes(this.nomeBusca);
    return this.listaClientes;
  }

  preparaEdicao(id: string){
    this.router.navigate(['/cadastro'], {queryParams: {'id': id}});
  }

  preparaDeletar(cliente: Cliente){
    cliente.deletando = true;
  }

  deletar(cliente: Cliente){
    this.service.deletar(cliente);
    this.ngOnInit();
    this.mostrarSnackBar("Cliente deletado com sucesso!")
  }

  mostrarSnackBar(mensagem: string){
    this.snack.open(mensagem, "ok");
  }
}
