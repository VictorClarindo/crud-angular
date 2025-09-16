import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfFormat',
  standalone: true
})

export class CpfFormatPipe implements PipeTransform{
  transform(cpf: string): string {
    const cpfLimpo: string = cpf.replace(/\D/g, '');

    if(cpfLimpo.length !== 11){
      throw new Error("O CPF deve ter 11 dígitos");
    }

    return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}
