package com.openclassrooms.mddapi.response;

import lombok.Data;

import java.util.ArrayList;

@Data
public class UserResponse {
    private Integer id;

    private String email;

    private String username;

    private ArrayList<String> topics;

}