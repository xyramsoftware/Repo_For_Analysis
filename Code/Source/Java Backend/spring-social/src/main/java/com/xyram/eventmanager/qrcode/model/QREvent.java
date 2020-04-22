package com.xyram.eventmanager.qrcode.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class QREvent {
	
	String eventId;
	
	String eventName;
	
	boolean qrScanCheck;
	
	public QREvent() {
		
	}

	public QREvent(String eventId, String eventName, boolean qrScanCheck) {
		super();
		this.eventId = eventId;
		this.eventName = eventName;
		this.qrScanCheck = qrScanCheck;
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

	public boolean isQRScanCheck() {
		return qrScanCheck;
	}

	public void setQRScanCheck(boolean qrScanCheck) {
		this.qrScanCheck = qrScanCheck;
	}

}
