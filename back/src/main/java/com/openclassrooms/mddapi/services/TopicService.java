package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.TopicDTO;

import java.security.Principal;

public interface TopicService {
    Object getTopics();

    TopicDTO getTopic(Long id);

    String createTopic(TopicDTO topicDTO);

    String subscribeToTopic(Long id, Principal principal);

    String unsubscribeToTopic(Long id, Principal principal);
}
