package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.ArticleDTO;


public interface ArticleService {
    Object getArticles();

    String createArticle(ArticleDTO articleDTO);

    ArticleDTO getArticle(Long id);

    String createComment(Long articleID, String commentContent);
}
