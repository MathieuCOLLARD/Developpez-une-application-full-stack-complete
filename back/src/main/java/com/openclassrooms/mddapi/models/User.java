package com.openclassrooms.mddapi.models;

import lombok.*;
import lombok.experimental.Accessors;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Entity
@Table(name = "USERS", uniqueConstraints = {
    @UniqueConstraint(columnNames = "email")
})
@Data
@EqualsAndHashCode(of = {"id"})
@Builder
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@ToString
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @NonNull
  @Size(max = 50)
  @Email
  @Column(name = "email")
  private String email;


  @NonNull
  @Size(max = 20)
  @Column(name = "username")
  private String username;

  @NonNull
  @Size(max = 120)
  @Column(name = "password")
  private String password;

  @CreatedDate
  @Column(name = "created_at", updatable = false)
  private LocalDateTime createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at")
  private LocalDateTime updatedAt;

  @Column(name = "topics")
  private ArrayList<String> topics;

}
