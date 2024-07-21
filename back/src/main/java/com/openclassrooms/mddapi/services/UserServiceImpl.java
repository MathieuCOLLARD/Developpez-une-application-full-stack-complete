package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.UserDTO;
import com.openclassrooms.mddapi.exception.BadRequestException;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.response.UserResponse;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.Optional;

@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    private ModelMapper modelMapper;

    private final PasswordEncoder passwordEncoder;

    @Transactional
    @Override
    public UserResponse me(Principal user) {
        return modelMapper.map(userRepository.findByEmail(user.getName()), UserResponse.class);
    }


    @Transactional
    @Override
    public UserResponse updateUser(UserDTO userDTO, Principal principalUser) {
        Optional<User> user = userRepository.findByEmail(principalUser.getName());

        user.get().setUsername(userDTO.getUsername());
        user.get().setEmail(userDTO.getEmail());
        user.get().setPassword(userDTO.getPassword());
        userRepository.save(user.get());
        return modelMapper.map(user, UserResponse.class);
    }
    @Transactional
    @Override
    public void save(UserDTO userDTO) {
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new BadRequestException("Email is already in use!");
        }

        // Create new user's account
        User user = new User(userDTO.getEmail(),
                userDTO.getUsername(),
                passwordEncoder.encode(userDTO.getPassword()));

        userRepository.save(user);

    }

}
