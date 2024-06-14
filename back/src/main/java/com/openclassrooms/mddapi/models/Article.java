package com.openclassrooms.mddapi.models;

import lombok.*;
import lombok.experimental.Accessors;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.sql.Timestamp;
import java.util.ArrayList;

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

    @NonNull
    @Column(name = "author")
    @Size(max = 50)
    private String author;

    @NonNull
    @Column(name = "content")
    private String content;

    @Column(name = "comments")
    private ArrayList<String> comments;

    private Timestamp createdAt;

}
