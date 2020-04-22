package com.xyram.eventmanager.fileimport.service;

import java.io.IOException;
import java.util.Map;

import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface FileImportService {

	Map importAndSMS(MultipartFile file) throws IOException, FileUploadException;

}
