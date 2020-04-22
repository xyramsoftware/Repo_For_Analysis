package com.xyram.eventmanager.qrcode.service;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import com.xyram.eventmanager.qrcode.model.Events;
import com.xyram.eventmanager.qrcode.model.QREvent;
import com.xyram.eventmanager.qrcode.model.Ticket;
import com.xyram.eventmanager.qrcode.repository.EventRepository;
import com.xyram.eventmanager.qrcode.repository.TicketRepository;

@Service
public class QRGeneratorService {

	@Autowired
	private TicketRepository ticketRepository;

	@Autowired
	private EventRepository eventRepository;

	private Ticket ticket;

//	public static Map<String, Map> QRCodeCache = new HashMap<>(10000);

	public Map generateCodes(int count, String event) throws WriterException, IOException {

		ticketRepository.deleteAll();

		List<QREvent> qrEvents = getEvents();

		clearOldTickets();

		Map<String, String> response = new HashMap<>();

		Map<String, String> ticketDetails;

//		File database = new File("D:/Project-Space/QRCodes/tickets/details.txt");
		File database = new File("../QRCodes/ticketdetails/details.txt");
		BufferedWriter bf = new BufferedWriter(new FileWriter(database));

		String filePath;
		int size = 125;
		String fileType = "png";

//		QRCodeCache.clear();

		for (int i = 1; i <= count; i++) {
			UUID uuid = UUID.randomUUID();
			filePath = "../QRCodes/ticket-" + i;
//			filePath = "D:/Project-Space/QRCodes/ticket-" + i;
			ticketDetails = new HashMap<>();

			ticketDetails.put("Id", uuid.toString());
			ticketDetails.put("T", "T");

			GsonBuilder gsonMapBuilder = new GsonBuilder();
			Gson gsonObject = gsonMapBuilder.create();
			String JSONObject = gsonObject.toJson(ticketDetails);

			File qrFile = new File(filePath);
			createQRImage(qrFile, JSONObject, size, fileType);

			Ticket ti = new Ticket();
			ti.setId(uuid.toString());
			ti.setFilepath(filePath);
			ti.setEvents(qrEvents);

			ticketRepository.save(ti);
			ti = null;

//			ticketDetails.put("filepath", filePath);
//			QRCodeCache.put(uuid.toString(), ticketDetails);

			bf.write(i + ":" + uuid.toString() + ": ticketDetails " + ticketDetails);
			bf.newLine();

		}

		bf.flush();
		bf.close();

//		Tickets tickets = new Tickets(new Date(), event, QRCodeCache);
//		ticketRepository.save(tickets);

//		QRCodeCache.clear();

		System.out.println("DONE");
		response.put("status", "success");
		return response;
	}

	private void clearOldTickets() {
		File dir = new File("../QRCodes");

		File[] listFiles = dir.listFiles();
		for (File file : listFiles) {
			System.out.println("Deleting " + file.getName());
			file.delete();
		}
	}

	private static void createQRImage(File qrFile, String qrCodeText, int size, String fileType)
			throws WriterException, IOException {
		// Create the ByteMatrix for the QR-Code that encodes the given String
		Hashtable<EncodeHintType, ErrorCorrectionLevel> hintMap = new Hashtable<>();
		hintMap.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.L);
		QRCodeWriter qrCodeWriter = new QRCodeWriter();
		BitMatrix byteMatrix = qrCodeWriter.encode(qrCodeText, BarcodeFormat.QR_CODE, size, size, hintMap);
		// Make the BufferedImage that are to hold the QRCode
		int matrixWidth = byteMatrix.getWidth();
		BufferedImage image = new BufferedImage(matrixWidth, matrixWidth, BufferedImage.TYPE_INT_RGB);
		image.createGraphics();

		Graphics2D graphics = (Graphics2D) image.getGraphics();
		graphics.setColor(Color.WHITE);
		graphics.fillRect(0, 0, matrixWidth, matrixWidth);
		// Paint and save the image using the ByteMatrix
		graphics.setColor(Color.BLACK);

		for (int i = 0; i < matrixWidth; i++) {
			for (int j = 0; j < matrixWidth; j++) {
				if (byteMatrix.get(i, j)) {
					graphics.fillRect(i, j, 1, 1);
				}
			}
		}
		ImageIO.write(image, fileType, qrFile);
	}

	private List<QREvent> getEvents() {
		List<QREvent> qrEvents = new ArrayList<>();

		List<Events> events = eventRepository.findAll();
		events.forEach(e -> {
			qrEvents.add(new QREvent(e.getEventId(), e.getEventName(), false));
		});

		System.out.println(qrEvents);
		return qrEvents;
	}

	public Map<String, Object> getQRCodeDetails(String uuid) {
		Map<String, Object> response = new HashMap<>();

		Optional<Ticket> t = ticketRepository.findById(uuid);
		t.ifPresent(ti -> {
			ticket = ti;
		});

		if (ticket != null) {
			response.put("response", ticket);
		} else {
			response.put("response", "Invalid QR Code");
		}
		ticket = null;

//		if (QRCodeCache.containsKey(uuid)) {
//			return QRCodeCache.get(uuid);
//		}
//		else {
//			Optional<Tickets> t = ticketRepository.findById("ISFK2020");
//			t.ifPresent(e -> {
//				QRCodeCache = e.getTickets();
//
//			});
//			if (QRCodeCache.containsKey(uuid))
//				return QRCodeCache.get(uuid);
//		}
//		response.put("response", "Invalid QR Code");
		return response;
	}

	public Ticket updateTicket(Ticket ticket) {
		return ticketRepository.save(ticket);
	}

}
