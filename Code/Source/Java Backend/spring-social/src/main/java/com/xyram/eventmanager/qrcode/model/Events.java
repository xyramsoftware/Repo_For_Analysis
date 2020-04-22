package com.xyram.eventmanager.qrcode.model;

import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document
public class Events {
	
	@Id
	@Field("_id")
	String eventId;
	
	@Field("title")
	String eventName;

	public Events() {
		
	}

	public Events(String eventId, String eventName) {
		super();
		this.eventId = eventId;
		this.eventName = eventName;
	}

	public String getEventId() {
		return eventId;
	}

	public void setEventId(String eventId) {
		this.eventId = eventId;
	}

	public String getEventName() {
		return eventName;
	}

	public void setEventName(String eventName) {
		this.eventName = eventName;
	}

}
