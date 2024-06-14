package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.ArticleDTO;
import com.openclassrooms.mddapi.response.ArticleResponse;
import com.openclassrooms.mddapi.response.MessageResponse;
import com.openclassrooms.mddapi.services.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;


@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    @Autowired
    ArticleService articleService;

    @GetMapping("")
    public ArticleResponse getArticles(){
        return new ArticleResponse(articleService.getArticles());
    }

    @PostMapping("")
    public MessageResponse createArticle(@Valid @ModelAttribute ArticleDTO articleDTO){
        return new MessageResponse(articleService.createArticle(articleDTO));
    }

    @GetMapping("/{id}")
    public Object getArticle(@PathVariable Long id){
        ArticleDTO articleDTO = articleService.getArticle(id);
        if(articleDTO == null){
            throw new EntityNotFoundException("Article not found");
        }
        return articleDTO;
    }

    // Add username parameter to createComment method
    @PostMapping("/comments")
    public MessageResponse createComment(Long articleID, String commentContent){
        return new MessageResponse(articleService.createComment(articleID, commentContent));
    }
}
