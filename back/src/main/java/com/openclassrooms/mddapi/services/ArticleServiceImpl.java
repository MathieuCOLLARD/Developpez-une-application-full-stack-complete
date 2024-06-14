package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.ArticleDTO;
import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.sql.Timestamp;
import java.util.ArrayList;

@AllArgsConstructor
@Service
public class ArticleServiceImpl implements ArticleService {

    @Autowired
    ArticleRepository articleRepository;

    @Autowired
    private ModelMapper modelMapper;
    @Override
    public Object getArticles() {
       return articleRepository.findAll();
    }

    @Override
    public String createArticle(ArticleDTO articleDTO) {
        Article article = modelMapper.map(articleDTO, Article.class);
        article.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        article.setComments(new ArrayList<>());
        articleRepository.save(article);
        return "Article created !";
    }

    @Override
    public ArticleDTO getArticle(Long id) {
        return articleRepository.findById(id).map(article -> modelMapper.map(article, ArticleDTO.class)).orElse(null);
    }

    @Override
    public String createComment(Long articleID, String commentContent) {
        Article article = articleRepository.findById(articleID).
                orElseThrow(() -> new RuntimeException("Article not found"));
        article.getComments().add(commentContent);
        articleRepository.save(article);

        return "Comment created !";
    }
}
