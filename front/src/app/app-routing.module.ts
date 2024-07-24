import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './pages/articles/articles.component';
import { UnauthGuard } from './guards/unauth.guard';
import { AuthGuard } from './guards/auth.guard';
import { TopicsComponent } from './pages/topics/topics.component';
import { DetailArticlesComponent } from './pages/articles/detailArticles.component';
import { NewArticleComponent } from './pages/articles/newArticle.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { 
    path: '',
    canActivate: [UnauthGuard],
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  { 
    path: 'articles',
    canActivate: [AuthGuard],
    component: ArticlesComponent
  },

  { 
    path: 'articles/:id',
    canActivate: [AuthGuard],
    component: DetailArticlesComponent
  },

  { 
    path: 'newArticle',
    canActivate: [AuthGuard],
    component: NewArticleComponent
  },

  {
    path: 'topics',
    canActivate: [AuthGuard],
    component: TopicsComponent
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent
  },
  {
    path: 'notFound', // wildcard
    component: NotFoundComponent,
  },
  {
    path: '**', // wildcard
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
