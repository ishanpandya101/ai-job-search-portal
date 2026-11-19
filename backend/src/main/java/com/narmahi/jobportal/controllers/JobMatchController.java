package com.narmahi.jobportal.controllers;

import com.narmahi.jobportal.models.MatchResult;
import com.narmahi.jobportal.services.ResumeAnalyzerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/ai")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
public class JobMatchController {

    private final ResumeAnalyzerService resumeAnalyzerService;

    public JobMatchController(ResumeAnalyzerService resumeAnalyzerService) {
        this.resumeAnalyzerService = resumeAnalyzerService;
    }

    @PostMapping(value = "/upload-resume", consumes = org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadResume(@RequestParam("file") org.springframework.web.multipart.MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Uploaded file is empty."));
            }

            String filename = file.getOriginalFilename();
            String extractedText = "";

            if (filename != null && filename.endsWith(".pdf")) {
                try (org.apache.pdfbox.pdmodel.PDDocument document = org.apache.pdfbox.pdmodel.PDDocument.load(file.getInputStream())) {
                    org.apache.pdfbox.text.PDFTextStripper stripper = new org.apache.pdfbox.text.PDFTextStripper();
                    extractedText = stripper.getText(document);
                }
            } else {
                extractedText = new String(file.getBytes(), java.nio.charset.StandardCharsets.UTF_8);
            }

            return ResponseEntity.ok(Map.of(
                "filename", filename,
                "resumeText", extractedText.trim()
            ));

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "File processing failed: " + e.getMessage()));
        }
    }

    @PostMapping("/analyze")
    public ResponseEntity<?> analyzeJobMatch(@RequestBody Map<String, String> payload) {
        try {
            String resumeText = payload.get("resumeText");
            String jobDescription = payload.get("jobDescription");

            if (resumeText == null || jobDescription == null || resumeText.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Resume and Job Description are required."));
            }

            MatchResult result = resumeAnalyzerService.analyzeMatch(resumeText, jobDescription);
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "AI Analysis failed: " + e.getMessage()));
        }
    }

    @PostMapping("/generate-summary")
    public ResponseEntity<?> generateProfessionalSummary(@RequestBody Map<String, String> payload) {
        try {
            String title = payload.get("title");
            String skills = payload.get("skills");

            if (title == null || skills == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Professional title and skills are required."));
            }

            String summary = resumeAnalyzerService.generateSummary(title, skills);
            return ResponseEntity.ok(Map.of("summary", summary));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "Summary generation failed: " + e.getMessage()));
        }
    }

    @PostMapping("/generate-bullets")
    public ResponseEntity<?> generateBulletPoints(@RequestBody Map<String, String> payload) {
        try {
            String jobTitle = payload.get("jobTitle");
            String company = payload.get("company");

            if (jobTitle == null || company == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Job title and company are required."));
            }

            List<String> bullets = resumeAnalyzerService.generateBullets(jobTitle, company);
            return ResponseEntity.ok(Map.of("bullets", bullets));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "Bullet points generation failed: " + e.getMessage()));
        }
    }

    @PostMapping("/search-jobs")
    public ResponseEntity<?> searchAIOptimizedJobs(@RequestBody Map<String, String> payload) {
        try {
            String query = payload.get("query");
            if (query == null || query.isEmpty()) {
                query = "MERN Stack Developer";
            }

            com.fasterxml.jackson.databind.JsonNode jobs = resumeAnalyzerService.searchJobs(query);
            return ResponseEntity.ok(jobs);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "AI Job Search failed: " + e.getMessage()));
        }
    }
}