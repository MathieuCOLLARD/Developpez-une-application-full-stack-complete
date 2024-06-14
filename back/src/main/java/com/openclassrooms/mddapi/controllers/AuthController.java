package com.openclassrooms.mddapi.controllers;

import javax.validation.Valid;

import com.openclassrooms.mddapi.dto.UserDTO;
import com.openclassrooms.mddapi.payload.response.JwtResponse;
import com.openclassrooms.mddapi.security.services.UserDetailsImpl;
import com.openclassrooms.mddapi.services.UserService;
import com.openclassrooms.mddapi.validation.OnCreateUser;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.openclassrooms.mddapi.security.jwt.JwtUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;

    private UserService userService;

    AuthController(AuthenticationManager authenticationManager,
                   PasswordEncoder passwordEncoder,
                   JwtUtils jwtUtils,
                   UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
    }

    @PostMapping("/login")
    public JwtResponse authenticateUser(@Valid @RequestBody UserDTO userDTO) throws UsernameNotFoundException {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userDTO.getEmail(), userDTO.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();


        return new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername());
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerUser(@Validated(OnCreateUser.class) @RequestBody UserDTO userDTO) {
        userService.save(userDTO);
    }
}
