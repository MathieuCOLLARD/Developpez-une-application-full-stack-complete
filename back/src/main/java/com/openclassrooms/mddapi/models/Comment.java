package com.openclassrooms.mddapi.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "COMMENTS")
@Data
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "content")
    private String content;

    @Column(name = "author")
    private String author;

    @ManyToOne
    @JoinColumn(name = "article_id")
    private Article article;

}
