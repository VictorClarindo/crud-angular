import { Injectable } from '@angular/core';
import { Cliente } from './formulario/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  static REPO_CLIENTES = "_CLIENTES";

  constructor() { }

  salvar(cliente: Cliente){
    const storage = this.obterStorage();
    storage.push(cliente);
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  pesquisarClientes(nomeCliente: string): Cliente[]{
    
    const clientes = this.obterStorage();

    if(!nomeCliente) return clientes;
    const nomeClienteLower = nomeCliente.toLowerCase();

    return clientes.filter(cliente => cliente.nome?.toLowerCase().indexOf(nomeClienteLower) !== -1);
  }

  pesquisarClientePorId(id: string): Cliente | undefined{
    const clientes = this.obterStorage();

    return clientes.find(cliente => cliente.id === id);
  }

  private obterStorage(): Cliente[]{
    const repositorioClientes = localStorage.getItem(ClienteService.REPO_CLIENTES);

    if(repositorioClientes){
      const clientes: Cliente[] = JSON.parse(repositorioClientes);
      return clientes;
    }

    const clientes: Cliente[] = [];
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
    return clientes;
  }

  
}
