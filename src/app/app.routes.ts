import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import(
                './features/country/country.component'
            ).then((c) => c.CountryComponent),
    },
    {
        path: 'app-state',
        loadComponent: () =>
            import(
                './features/state/state.component'
            ).then((c) => c.StateComponent),
    },
];
