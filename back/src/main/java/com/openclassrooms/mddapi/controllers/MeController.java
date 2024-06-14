package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.UserDTO;
import com.openclassrooms.mddapi.response.UserResponse;
import com.openclassrooms.mddapi.services.UserService;
import com.openclassrooms.mddapi.validation.OnUpdateMe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.security.Principal;

@RestController
@RequestMapping("/api/me")
public class MeController {

    @Autowired
    private UserService userService;

    @GetMapping("")
    public UserResponse me(Principal principalUser) throws EntityNotFoundException {
        return userService.me(principalUser);
    }

    @PutMapping("")
    public UserResponse updateUser(@Validated(OnUpdateMe.class) @RequestBody UserDTO userDTO, Principal principalUser){
        return userService.updateUser(userDTO, principalUser);
    }

}
