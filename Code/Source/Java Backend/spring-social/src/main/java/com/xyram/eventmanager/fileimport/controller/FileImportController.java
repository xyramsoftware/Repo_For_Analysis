package com.xyram.eventmanager.fileimport.controller;

import java.io.IOException;
import java.util.Map;

import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.xyram.eventmanager.fileimport.service.FileImportService;

@RestController
@RequestMapping("api/admin")
public class FileImportController {
	
	@Autowired
	FileImportService fileImportService;

	@PostMapping(value="/upload", consumes = {"multipart/form-data"})
	public Map handleFileUpload(@RequestParam("file") MultipartFile file, @RequestParam("request") String request,
			RedirectAttributes redirectAttributes) throws IOException, FileUploadException {
		
		System.out.println(request);

		return fileImportService.importAndSMS(file);
	}
	
	@GetMapping("/test")
	public String testApp() {
		return "If you can read this, server is up and running";
	}
}
