package com.xyram.eventmanager.qrcode.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.xyram.eventmanager.qrcode.model.Ticket;

@Repository
public interface TicketRepository extends MongoRepository<Ticket, String>{
	
	
	
}
