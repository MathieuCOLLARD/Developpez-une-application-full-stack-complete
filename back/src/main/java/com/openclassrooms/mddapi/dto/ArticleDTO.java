package com.openclassrooms.mddapi.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArticleDTO {

    // add Topic

    private String title;

    private String author;

    private String content;

    private ArrayList<String> comments;

}