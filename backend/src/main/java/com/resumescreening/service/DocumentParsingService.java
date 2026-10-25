package com.resumescreening.service;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.InputStream;

@Service
public class DocumentParsingService {

    private static final Logger logger = LoggerFactory.getLogger(DocumentParsingService.class);

    /**
     * Extracts plain text from an uploaded PDF or DOCX file using Apache PDFBox or Apache POI.
     */
    public String extractText(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Cannot extract text from an empty file.");
        }

        String fileName = file.getOriginalFilename() != null ? file.getOriginalFilename().toLowerCase() : "";

        try (InputStream inputStream = file.getInputStream()) {
            if (fileName.endsWith(".pdf")) {
                return extractPdfText(file.getBytes());
            } else if (fileName.endsWith(".docx")) {
                return extractDocxText(inputStream);
            } else {
                throw new IllegalArgumentException("Unsupported file type: " + fileName + ". Only PDF and DOCX files are permitted.");
            }
        } catch (Exception e) {
            logger.error("Failed to parse document: {}", e.getMessage(), e);
            throw new RuntimeException("Document extraction failed: " + e.getMessage());
        }
    }

    /**
     * Extracts text from PDF bytes using Apache PDFBox 3.x
     */
    private String extractPdfText(byte[] pdfBytes) throws Exception {
        try (PDDocument document = Loader.loadPDF(pdfBytes)) {
            if (document.isEncrypted()) {
                throw new IllegalStateException("Encrypted or password-protected PDF files cannot be processed.");
            }

            PDFTextStripper stripper = new PDFTextStripper();
            stripper.setSortByPosition(true);
            String text = stripper.getText(document);

            return sanitizeText(text);
        }
    }

    /**
     * Extracts text from DOCX input stream using Apache POI
     */
    private String extractDocxText(InputStream inputStream) throws Exception {
        try (XWPFDocument docx = new XWPFDocument(inputStream);
             XWPFWordExtractor extractor = new XWPFWordExtractor(docx)) {
            String text = extractor.getText();
            return sanitizeText(text);
        }
    }

    /**
     * Normalizes whitespace and removes null characters
     */
    private String sanitizeText(String input) {
        if (input == null) return "";
        return input.replaceAll("\\u0000", "")
                    .replaceAll("\\r\\n", "\n")
                    .replaceAll("[ \\t]+", " ")
                    .trim();
    }
}
