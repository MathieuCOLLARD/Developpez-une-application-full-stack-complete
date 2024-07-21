package com.openclassrooms.mddapi.response;

import com.openclassrooms.mddapi.models.Topic;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class UserResponse {
    private Integer id;

    private String email;

    private String username;

    private List<Topic> topics;

}