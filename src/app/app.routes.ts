import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Blog } from './pages/blog/blog';
import { Contact } from './pages/contact/contact';
import { APropos } from './pages/a-propos/a-propos';
import { Article } from './pages/article/article';
import { AjouterArticle } from './pages/ajouter-article/ajouter-article';

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
        path: 'article/ajouter',
        component: AjouterArticle,
        title: "ajouter un nouvel article"
    },
    {
        path: 'article/:id',
        component: Article,
        title: "article"
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
        title: "Home"
    }
];
