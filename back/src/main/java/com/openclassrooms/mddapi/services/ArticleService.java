package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.ArticleDTO;
import com.openclassrooms.mddapi.dto.CommentDTO;

import java.security.Principal;

/**
 * Service interface for managing articles and comments.
 */
public interface ArticleService {

    /**
     * Retrieves a list of all articles.
     *
     * @return an object representing a list of all articles.
     */
    Object getArticles();

    /**
     * Creates a new article.
     *
     * @param articleDTO the data transfer object containing article details.
     * @param principalUser the current authenticated user making the request.
     * @return a message indicating the result of the operation.
     */
    String createArticle(ArticleDTO articleDTO, Principal principalUser);

    /**
     * Retrieves a specific article by its ID.
     *
     * @param id the ID of the article to retrieve.
     * @return the data transfer object representing the article, or null if not found.
     */
    ArticleDTO getArticle(Long id);

    /**
     * Creates a new comment for a specific article.
     *
     * @param commentDTO the data transfer object containing comment details.
     * @param principalUser the current authenticated user making the request.
     * @return a message indicating the result of the operation.
     */
    String createComment(CommentDTO commentDTO, Principal principalUser);

    /**
     * Retrieves a list of comments for a specific article.
     *
     * @param articleId the ID of the article for which comments are to be retrieved.
     * @return a list of data transfer objects representing comments for the specified article.
     */
    Object getComments(Long articleId);
}
