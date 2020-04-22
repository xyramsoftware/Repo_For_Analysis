package com.xyram.eventmanager.fileimport.service;

import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.opencsv.CSVReader;
import com.xyram.eventmanager.fileimport.model.User;

/**
 * 
 * @author Pradeep Kumara K
 *
 */
@Service
public class FileImportServiceImpl implements FileImportService{

	private static Set<User> users = new HashSet<>();

	private String filePath = "../Files/";

	public Map<String, String> importAndSMS(MultipartFile file) throws IOException, FileUploadException {
		
		Map<String, String> response = new HashMap<>();

		String fileName = saveFile(file);

		CSVReader reader = null;
		FileReader fileReader = null;
		try {
			fileReader = new FileReader(filePath + fileName);
			reader = new CSVReader(fileReader);
			String[] line;
			while ((line = reader.readNext()) != null) {
				users.add(new User(line[0], line[1]));
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		finally {
			reader.close();
			fileReader.close();
		}

		for (User user : users)
			InviteUser(user);
		
		response.put("status", "success");
		return response;

	}

	private String saveFile(MultipartFile file) throws IOException, FileUploadException {

		Path fileStorageLocation = Paths.get(filePath);

		String fileName = StringUtils.cleanPath(file.getOriginalFilename());

		int dotIndex = fileName.lastIndexOf('.');
		String format = (dotIndex == -1) ? "" : fileName.substring(dotIndex + 1);

		try {
			// Check if the file is of CSV type
			if (!format.equals("csv")) {
				throw new FileUploadException(fileName + " is not of CSV type");
			}

			Path targetLocation = fileStorageLocation.resolve(fileName);
			Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
			System.out.println("File saved at "+targetLocation);

			return fileName;
		} catch (IOException ex) {
			throw new FileUploadException("Could not store file " + fileName + ". Please try again!", ex);
		}

	}

	private void InviteUser(User user) {
		System.out.println(user.getName() + ": " + user.getPhone());
	}

}
