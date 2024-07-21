package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.ArticleDTO;
import com.openclassrooms.mddapi.dto.CommentDTO;
import com.openclassrooms.mddapi.models.Comment;
import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.models.Topic;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import com.openclassrooms.mddapi.repository.CommentRepository;
import com.openclassrooms.mddapi.repository.TopicRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Service
public class ArticleServiceImpl implements ArticleService {

    @Autowired
    ArticleRepository articleRepository;

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    TopicRepository topicRepository;

    @Autowired
    private ModelMapper modelMapper;
    @Override
    public Object getArticles() {
       return articleRepository.findAll();
    }

    @Override
    public String createArticle(ArticleDTO articleDTO, Principal principalUser) {
        Article article = modelMapper.map(articleDTO, Article.class);
        article.setId(null);
        article.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        article.setAuthor(principalUser.getName());
        Topic topic = topicRepository.findByTitle(articleDTO.getTopicTitle())
                .orElseThrow(() -> new RuntimeException("Topic not found"));
        article.setTopic(topic);
        articleRepository.save(article);
        return "Article created !";
    }

    @Override
    public ArticleDTO getArticle(Long id) {
        return articleRepository.findById(id).map(article -> modelMapper.map(article, ArticleDTO.class)).orElse(null);
    }

    @Transactional
    @Override
    public String createComment(CommentDTO commentDTO, Principal principalUser) {
        Article article = articleRepository.findById(commentDTO.getArticleID()).
                orElseThrow(() -> new RuntimeException("Article not found"));
        Comment comment = modelMapper.map(commentDTO, Comment.class);
        comment.setAuthor(principalUser.getName());
        comment.setContent(commentDTO.getContent());
        comment.setArticle(article);
        commentRepository.save(comment);
        return "Comment created !";
    }

    @Override
    public List<CommentDTO> getComments(Long articleId) {
        List<Comment> comments = commentRepository.findByArticleId(articleId);
        List<CommentDTO> commentDTOS = new ArrayList<>();
        for (Comment comment : comments) {
            commentDTOS.add(modelMapper.map(comment, CommentDTO.class));
        }
        return commentDTOS;
    }
}
