package com.xyram.eventmanager.qrcode.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.xyram.eventmanager.qrcode.model.Events;

public interface EventRepository extends MongoRepository<Events, String>{

}
