package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.TopicDTO;
import com.openclassrooms.mddapi.models.Topic;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.repository.TopicRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Optional;

@AllArgsConstructor
@Service
public class TopicServiceImpl implements TopicService {

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Object getTopics() {
        return topicRepository.findAll();
    }

    @Override
    public TopicDTO getTopic(Long id) {
        return topicRepository.findById(id).map(topic -> modelMapper.map(topic, TopicDTO.class)).orElse(null);
    }

    @Override
    public String createTopic(TopicDTO topicDTO) {
        Topic topic = modelMapper.map(topicDTO, Topic.class);
        topicRepository.save(topic);
        return "Topic created !";
    }

    @Override
    public String subscribeToTopic(Long id, Principal principal) {
        Topic topic = topicRepository.findById(id).orElseThrow(() -> new RuntimeException("Topic not found"));
        Optional<User> user = userRepository.findByEmail(principal.getName());
        user.get().getTopics().add(topic);
        userRepository.save(user.get());
        return "Subscribed to topic !";
    }

    @Override
    public String unsubscribeToTopic(Long id, Principal principal) {
        Topic topic = topicRepository.findById(id).orElseThrow(() -> new RuntimeException("Topic not found"));
        Optional<User> user = userRepository.findByEmail(principal.getName());
        user.get().getTopics().remove(topic);
        userRepository.save(user.get());
        return "Unsubscribed to topic !";
    }

}
