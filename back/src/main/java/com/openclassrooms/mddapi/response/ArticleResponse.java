package com.openclassrooms.mddapi.response;

import lombok.Data;

@Data
public class ArticleResponse {
    private Object articles;
    public ArticleResponse(Object articles) {
        this.articles = articles;
    }
}