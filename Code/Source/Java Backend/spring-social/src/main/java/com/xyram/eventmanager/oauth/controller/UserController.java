package com.xyram.eventmanager.oauth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xyram.eventmanager.oauth.exception.ResourceNotFoundException;
import com.xyram.eventmanager.oauth.model.OAuthUser;
import com.xyram.eventmanager.oauth.repository.OAuthUserRepository;
import com.xyram.eventmanager.oauth.security.CurrentUser;
import com.xyram.eventmanager.oauth.security.UserPrincipal;

@RestController
public class UserController {

    @Autowired
    private OAuthUserRepository userRepository;

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public OAuthUser getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findByEmail(userPrincipal.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }
}
