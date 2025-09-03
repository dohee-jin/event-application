package com.spring.event.repository;

import com.spring.event.domain.entity.EventUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventUserRepository extends JpaRepository<EventUser, Long > {
}
