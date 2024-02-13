package com.workshop.angular.repository;

import com.workshop.angular.entity.UserEvent;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserEventRepository extends MongoRepository<UserEvent, String> {
}
