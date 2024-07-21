package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.ArticleDTO;
import com.openclassrooms.mddapi.dto.CommentDTO;
import com.openclassrooms.mddapi.response.ArticleResponse;
import com.openclassrooms.mddapi.response.MessageResponse;
import com.openclassrooms.mddapi.services.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.security.Principal;


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
    public MessageResponse createArticle(@Valid @RequestBody ArticleDTO articleDTO, Principal principalUser){
        return new MessageResponse(articleService.createArticle(articleDTO, principalUser));
    }

    @GetMapping("/{id}")
    public Object getArticle(@PathVariable Long id){
        ArticleDTO articleDTO = articleService.getArticle(id);
        if(articleDTO == null){
            throw new EntityNotFoundException("Article not found");
        }
        return articleDTO;
    }

    @PostMapping("/comments")
    public MessageResponse createComment(@RequestBody CommentDTO commentDTO, Principal principalUser){
        return new MessageResponse(articleService.createComment(commentDTO, principalUser));
    }

    @GetMapping("/comments/{articleId}")
    public Object getComments(@PathVariable Long articleId){
        return articleService.getComments(articleId);
    }

}
