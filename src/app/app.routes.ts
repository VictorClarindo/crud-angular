import { Routes } from '@angular/router';
import { ConsultaComponent } from './consulta/consulta.component';
import { FormularioComponent } from './formulario/formulario.component';

export const routes: Routes = [
    {path: 'consulta', component: ConsultaComponent},
    {path: 'cadastro', component: FormularioComponent}
];
