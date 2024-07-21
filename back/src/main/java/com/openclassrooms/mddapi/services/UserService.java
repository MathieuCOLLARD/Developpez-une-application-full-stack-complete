package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.UserDTO;
import com.openclassrooms.mddapi.exception.BadRequestException;
import com.openclassrooms.mddapi.response.UserResponse;

import java.security.Principal;

/**
 * Service interface for managing user accounts and profiles.
 */
public interface UserService {

    /**
     * Retrieves the current user's profile information.
     *
     * @param user the current authenticated user.
     * @return a response object containing the current user's profile details.
     */
    UserResponse me(Principal user);

    /**
     * Updates the current user's profile information.
     *
     * @param userDTO the data transfer object containing the new user details.
     * @param principalUser the current authenticated user making the update request.
     * @return a response object containing the updated user profile details.
     */
    UserResponse updateUser(UserDTO userDTO, Principal principalUser);

    /**
     * Saves a new user account.
     *
     * @param userDTO the data transfer object containing the new user's details.
     * @throws BadRequestException if the email provided is already in use.
     */
    void save(UserDTO userDTO);
}
