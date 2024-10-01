package com.example.SafeScape.auth;

import com.example.SafeScape.common.UserRepository;
import com.example.SafeScape.exception.UserAlreadyExistsException;
import com.example.SafeScape.model.Role;
import com.example.SafeScape.model.User;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);

    private final UserRepository repository;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthenticationResponse register(RegisterRequest request) {
        logger.info("Attempting to register user: {}", request.getEmail());

        if (repository.findByEmail(request.getEmail()).isPresent()) {
            logger.error("User already exists: {}", request.getEmail());
            throw new UserAlreadyExistsException("User already exists with email: " + request.getEmail());
        }

        if (repository.findByUsername(request.getUsername()).isPresent()) {
            logger.error("Username already taken: {}", request.getUsername());
            throw new UserAlreadyExistsException("Username already taken: " + request.getUsername());
        }

        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .username(request.getUsername())
                .email(request.getEmail())
                .password(encoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        user = repository.save(user);

        return createAuthenticationResponse(user);
    }

    public AuthenticationResponse authenticate(AuthenticateRequest request) {
        logger.info("Attempting to authenticate user: {}", request.getEmail());

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = (User) authentication.getPrincipal();

        return createAuthenticationResponse(user);
    }

    private AuthenticationResponse createAuthenticationResponse(User user) {
        String jwtToken = jwtService.generateToken(user);
        Instant expiresAt = jwtService.getExpirationTime(jwtToken);

        logger.info("Token generated for user: {}", user.getEmail());

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .tokenType("Bearer")
                .expiresAt(expiresAt)
                .userId(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .build();
    }

    public boolean validateToken(String token) {
        try {
            // Assuming jwtService has a method to validate the token
            return jwtService.validateToken(token);
        } catch (Exception e) {
            logger.error("Token validation failed: {}", e.getMessage());
            return false;
        }
    }


}