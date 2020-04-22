package com.xyram.eventmanager.qrcode.model;

import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Ticket {

	@Id
	String id;
	String filepath;
	List events;
	
	public Ticket() {
		
	}
	
	public Ticket(String id, String filepath, List<Map> events) {
		super();
		this.id = id;
		this.filepath = filepath;
		this.events = events;
	}
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public String getFilepath() {
		return filepath;
	}
	
	public void setFilepath(String filepath) {
		this.filepath = filepath;
	}
	
	public List getEvents() {
		return events;
	}
	
	public void setEvents(List events) {
		this.events = events;
	}
}
