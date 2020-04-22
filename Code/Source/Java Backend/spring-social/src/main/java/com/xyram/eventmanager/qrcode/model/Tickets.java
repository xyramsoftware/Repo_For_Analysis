package com.xyram.eventmanager.qrcode.model;

import java.util.Date;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Tickets {

	@Id
	String eventName;
	Date dateCreated;
	Map<String, Map> tickets;
	
	public Tickets() {
	}
	
	public Tickets(Date date, String e, Map t) {
		dateCreated = date;
		eventName = e;
		tickets = t;
	}
	
	public Date getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(Date dateCreated) {
		this.dateCreated = dateCreated;
	}

	public String getEventName() {
		return eventName;
	}

	public void setEventName(String eventName) {
		this.eventName = eventName;
	}

	public void setTickets(Map<String, Map> tickets) {
		this.tickets = tickets;
	}
	
	public Map getTickets() {
		return tickets;
	}
	
}
