package com.spring.event.repository;

import com.spring.event.domain.entity.EventUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EventUserRepository extends JpaRepository<EventUser, Long > {

    boolean existsByEmail(String email);
    Optional<EventUser> findByEmail(String email);
}
