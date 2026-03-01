import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Blog } from './pages/blog/blog';
import { Contact } from './pages/contact/contact';
import { APropos } from './pages/a-propos/a-propos';
import { Article } from './pages/article/article';
import { AjouterArticle } from './pages/ajouter-article/ajouter-article';
import { Login } from './pages/login/login';
import { CreerCompte } from './pages/creer-compte/creer-compte';

export const routes: Routes = [
    {
        path: 'home',
        component: Home,
        title: "SportScience | Accueil"
    },
    {
        path: 'blog',
        component: Blog,
        title: "SportScience | Blog"
    },
        {
        path: 'a-propos',
        component: APropos,
        title: "Sport Science | A propos"
    },
    {
        path: 'contact',
        component: Contact,
        title: "Sport Science | Contact"
    },
    {
        path: 'login',
        component: Login,
        title: "Sport Science | Se connecter"
    },
        {
        path: 'creerCompte',
        component: CreerCompte,
        title: "Sport Science | Creer un compte"
    },
    {
        path: 'article/ajouter',
        component: AjouterArticle,
        title: "Sport Science | Ajouter un article"
    },
    {
        path: 'article/:id',
        component: Article,
        title: "Sport Science | Article"
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
        title: "Sport Science | Accueil"
    }
];
