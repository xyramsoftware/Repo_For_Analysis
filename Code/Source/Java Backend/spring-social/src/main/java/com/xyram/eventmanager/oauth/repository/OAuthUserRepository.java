package com.xyram.eventmanager.oauth.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.xyram.eventmanager.oauth.model.OAuthUser;

@Repository
public interface OAuthUserRepository extends MongoRepository<OAuthUser, String>{

    Optional<OAuthUser> findByEmail(String email);

    Boolean existsByEmail(String email);
}
