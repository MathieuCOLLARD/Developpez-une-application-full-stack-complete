package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.TopicDTO;

import java.security.Principal;

/**
 * Service interface for managing topics and user subscriptions.
 */
public interface TopicService {

    /**
     * Retrieves a list of all topics.
     *
     * @return an object representing a list of all topics.
     */
    Object getTopics();

    /**
     * Retrieves a specific topic by its ID.
     *
     * @param id the ID of the topic to retrieve.
     * @return the data transfer object representing the topic, or null if not found.
     */
    TopicDTO getTopic(Long id);

    /**
     * Creates a new topic.
     *
     * @param topicDTO the data transfer object containing topic details.
     * @return a message indicating the result of the operation.
     */
    String createTopic(TopicDTO topicDTO);

    /**
     * Subscribes the current user to a specific topic.
     *
     * @param id the ID of the topic to subscribe to.
     * @param principal the current authenticated user making the request.
     * @return a message indicating the result of the operation.
     */
    String subscribeToTopic(Long id, Principal principal);

    /**
     * Unsubscribes the current user from a specific topic.
     *
     * @param id the ID of the topic to unsubscribe from.
     * @param principal the current authenticated user making the request.
     * @return a message indicating the result of the operation.
     */
    String unsubscribeToTopic(Long id, Principal principal);
}
