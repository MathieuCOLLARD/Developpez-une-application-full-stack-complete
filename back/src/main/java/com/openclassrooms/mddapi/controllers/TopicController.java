package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.TopicDTO;
import com.openclassrooms.mddapi.response.MessageResponse;
import com.openclassrooms.mddapi.response.TopicResponse;
import com.openclassrooms.mddapi.services.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/topics")
public class TopicController {

    @Autowired
    TopicService topicService;

    @GetMapping("")
    public TopicResponse getTopics() {
        return new TopicResponse(topicService.getTopics());
    }

    @GetMapping("/{id}")
    public Object getTopic(@PathVariable Long id) throws EntityNotFoundException {
        TopicDTO topicDTO = topicService.getTopic(id);
        if(topicDTO == null){
            return new MessageResponse("Topic not found");
        }
        return topicDTO;
    }

    @PostMapping("")
    public MessageResponse createTopic(@Valid @ModelAttribute TopicDTO topicDTO){
        return new MessageResponse(topicService.createTopic(topicDTO));
    }

    @PutMapping("/{id}/subscribe")
    public MessageResponse subscribeToTopic(@PathVariable Long id, Principal principal){
        return new MessageResponse(topicService.subscribeToTopic(id, principal));
    }

    @PutMapping("/{id}/unsubscribe")
    public MessageResponse unsubscribeToTopic(@PathVariable Long id, Principal principal){
        return new MessageResponse(topicService.unsubscribeToTopic(id, principal));
    }
}
