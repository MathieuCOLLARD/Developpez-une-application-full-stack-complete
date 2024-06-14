package com.openclassrooms.mddapi.repository;

import com.openclassrooms.mddapi.models.Topic;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TopicRepository extends CrudRepository<Topic, Long> {
}
