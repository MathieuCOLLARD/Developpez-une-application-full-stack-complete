package com.openclassrooms.mddapi.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class Comment implements Serializable {

    private String content;

    private String author;

    public Comment() {
    }

    public Comment(String content, String author) {
        this.content = content;
        this.author = author;
    }

}
