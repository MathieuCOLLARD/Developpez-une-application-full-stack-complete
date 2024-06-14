package com.openclassrooms.mddapi.dto;

import com.openclassrooms.mddapi.validation.OnCreateUser;
import com.openclassrooms.mddapi.validation.OnUpdateMe;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;

    @NotEmpty(groups = {OnCreateUser.class})
    @Size(max = 50, groups = {OnUpdateMe.class, OnCreateUser.class})
    @Email(message = "Email should be valid", groups = {OnUpdateMe.class, OnCreateUser.class})
    private String email;

    @NotEmpty(groups = {OnCreateUser.class})
    @Size(max = 20, groups = {OnUpdateMe.class, OnCreateUser.class})
    private String username;
    
    @NotEmpty(groups = {OnCreateUser.class})
    @Size(max = 120, groups = {OnUpdateMe.class, OnCreateUser.class})
    private String password;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
