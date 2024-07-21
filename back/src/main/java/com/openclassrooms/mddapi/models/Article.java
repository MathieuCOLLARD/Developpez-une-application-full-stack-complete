package com.openclassrooms.mddapi.models;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.sql.Timestamp;

@Entity
@Table(name = "ARTICLES")
@Data
@EqualsAndHashCode(of = {"id"})
@Builder
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@ToString
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NonNull
    @Column(name = "title")
    @Size(max = 100)
    private String title;

    @Column(name = "author")
    @Size(max = 50)
    private String author;

    @NonNull
    @Column(name = "content")
    private String content;

    private Timestamp createdAt;

    @ManyToOne
    @JoinColumn(name = "topic_id")
    private Topic topic;

}
