package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.UserDTO;
import com.openclassrooms.mddapi.response.UserResponse;

import java.security.Principal;

public interface UserService {

    UserResponse me(Principal user);

    UserResponse updateUser(UserDTO userDTO, Principal principalUser);

    void save(UserDTO userDTO);
}
