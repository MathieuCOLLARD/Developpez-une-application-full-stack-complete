package com.openclassrooms.mddapi.response;

import lombok.Data;

@Data
public class TopicResponse {
    private Object topics;
    public TopicResponse(Object topics) {
        this.topics = topics;
    }
}
