package com.openclassrooms.mddapi.repository;


import com.openclassrooms.mddapi.models.Article;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ArticleRepository extends CrudRepository<Article, Long> {

}
