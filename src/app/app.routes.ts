import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Blog } from './pages/blog/blog';
import { Contact } from './pages/contact/contact';
import { APropos } from './pages/a-propos/a-propos';

export const routes: Routes = [
    {
        path: 'home',
        component: Home,
        title: "Home"
    },
    {
        path: 'blog',
        component: Blog,
        title: "Blog"
    },
        {
        path: 'a-propos',
        component: APropos,
        title: "A propos"
    },
    {
        path: 'contact',
        component: Contact,
        title: "Contact"
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
        title: "Home"
    }
];
