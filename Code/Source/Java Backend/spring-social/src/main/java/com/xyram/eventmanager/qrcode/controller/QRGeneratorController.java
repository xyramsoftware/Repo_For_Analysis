package com.xyram.eventmanager.qrcode.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.zxing.WriterException;
import com.xyram.eventmanager.qrcode.model.Ticket;
import com.xyram.eventmanager.qrcode.service.QRGeneratorService;

@RestController
public class QRGeneratorController {

	@Autowired
	QRGeneratorService qRGeneratorService;

	@PostMapping("api/admin/generateQRCodes")
	public Map GenerateQRCodes(@RequestBody Map<String, String> request) throws WriterException, IOException {
		return qRGeneratorService.generateCodes(Integer.parseInt(request.get("count")), "ISFK2020");
	}

	@GetMapping("api/admin/getQRCodeDetails/{uuid}")
	public Map getQRCodeDetails(@PathVariable String uuid) {
		return qRGeneratorService.getQRCodeDetails(uuid);
	}
	
	@PutMapping("api/admin/updateTicket")
    public Ticket updateDept(@RequestBody Ticket ticket) {
        return qRGeneratorService.updateTicket(ticket);
    }
}
