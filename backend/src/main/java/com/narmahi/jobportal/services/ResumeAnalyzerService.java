package com.narmahi.jobportal.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.narmahi.jobportal.models.MatchResult;

@Service
public class ResumeAnalyzerService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final ObjectMapper mapper = new ObjectMapper();

    public MatchResult analyzeMatch(String resumeText, String jobDescription) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String fullUrl = apiUrl + "?key=" + apiKey;

            String prompt = "You are an expert ATS. Analyze this resume against the job description. " +
                    "Return ONLY a pure JSON object (no markdown) with exact keys: " +
                    "\"matchPercentage\" (number), \"pros\" (array of strings), \"cons\" (array of strings). " +
                    "Resume: " + resumeText + " | " +
                    "Job Description: " + jobDescription;

            // Safe request body creation using ObjectMapper (handles newlines, quotes, etc.)
            Map<String, Object> textPart = Map.of("text", prompt);
            Map<String, Object> parts = Map.of("parts", List.of(textPart));
            Map<String, Object> contents = Map.of("contents", List.of(parts));
            String requestBody = mapper.writeValueAsString(contents);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

            String responseStr = restTemplate.postForObject(fullUrl, entity, String.class);
            return parseGeminiResponse(responseStr);

        } catch (Exception e) {
            throw new RuntimeException("AI Analysis failed: " + e.getMessage());
        }
    }

    private MatchResult parseGeminiResponse(String responseStr) throws Exception {
        JsonNode rootNode = mapper.readTree(responseStr);
        
        String aiResponseText = rootNode
                .path("candidates").get(0)
                .path("content")
                .path("parts").get(0)
                .path("text").asText();

        // Robust extraction of the JSON block to filter out any markdown (```json) or conversational text
        int startIdx = aiResponseText.indexOf("{");
        int endIdx = aiResponseText.lastIndexOf("}");
        if (startIdx != -1 && endIdx != -1 && endIdx > startIdx) {
            aiResponseText = aiResponseText.substring(startIdx, endIdx + 1);
        } else {
            aiResponseText = aiResponseText.replace("```json", "").replace("```", "").trim();
        }

        JsonNode resultNode = mapper.readTree(aiResponseText);

        MatchResult matchResult = new MatchResult();
        matchResult.setMatchPercentage(resultNode.path("matchPercentage").asInt());

        List<String> pros = new ArrayList<>();
        resultNode.path("pros").forEach(node -> pros.add(node.asText()));
        matchResult.setPros(pros);

        List<String> cons = new ArrayList<>();
        resultNode.path("cons").forEach(node -> cons.add(node.asText()));
        matchResult.setCons(cons);

        return matchResult;
    }

    public String generateSummary(String title, String skills) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String fullUrl = apiUrl + "?key=" + apiKey;

            String prompt = "Write an extremely premium, ATS-optimized professional resume summary (about 3-4 sentences, plain paragraph text) for a " + title + 
                    " with the following key skills: " + skills + ". Return ONLY the plain text summary, do not include any markdown, headers, quotes, or introduction.";

            Map<String, Object> textPart = Map.of("text", prompt);
            Map<String, Object> parts = Map.of("parts", List.of(textPart));
            Map<String, Object> contents = Map.of("contents", List.of(parts));
            String requestBody = mapper.writeValueAsString(contents);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

            String responseStr = restTemplate.postForObject(fullUrl, entity, String.class);
            JsonNode rootNode = mapper.readTree(responseStr);
            String rawResult = rootNode.path("candidates").get(0).path("content").path("parts").get(0).path("text").asText().trim();
            
            return rawResult.replace("\"", "").trim();
        } catch (Exception e) {
            throw new RuntimeException("AI Summary generation failed: " + e.getMessage());
        }
    }

    public List<String> generateBullets(String jobTitle, String company) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String fullUrl = apiUrl + "?key=" + apiKey;

            String prompt = "Generate three high-impact, quantifiable, ATS-friendly achievement bullet points for a " + jobTitle + 
                    " at " + company + ". Ensure they start with strong action verbs and include metrics (percentages or numbers). " +
                    "Return ONLY a pure JSON array of strings, e.g. [\"Achieved X...\", \"Led Y...\"]. Do not include markdown code blocks (such as ```json) or introduction.";

            Map<String, Object> textPart = Map.of("text", prompt);
            Map<String, Object> parts = Map.of("parts", List.of(textPart));
            Map<String, Object> contents = Map.of("contents", List.of(parts));
            String requestBody = mapper.writeValueAsString(contents);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

            String responseStr = restTemplate.postForObject(fullUrl, entity, String.class);
            JsonNode rootNode = mapper.readTree(responseStr);
            String aiResponseText = rootNode.path("candidates").get(0).path("content").path("parts").get(0).path("text").asText();

            int startIdx = aiResponseText.indexOf("[");
            int endIdx = aiResponseText.lastIndexOf("]");
            if (startIdx != -1 && endIdx != -1 && endIdx > startIdx) {
                aiResponseText = aiResponseText.substring(startIdx, endIdx + 1);
            } else {
                aiResponseText = aiResponseText.replace("```json", "").replace("```", "").trim();
            }

            JsonNode arrayNode = mapper.readTree(aiResponseText);
            List<String> bullets = new ArrayList<>();
            arrayNode.forEach(node -> bullets.add(node.asText()));
            return bullets;
        } catch (Exception e) {
            // Return standard fallback bullet points if parsing/Gemini fails
            return List.of(
                "Spearheaded key application development for " + jobTitle + " workflows, enhancing deployment velocity by 25%.",
                "Optimized database architectures and API query sequences, reducing server response times by 30%.",
                "Collaborated with cross-functional product design teams at " + company + " to drive highly interactive features."
            );
        }
    }

    public JsonNode searchJobs(String query) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String fullUrl = apiUrl + "?key=" + apiKey;

            String prompt = "Generate a list of 5 ideal matching job listings for the search query: " + query + ". " +
                    "Return ONLY a pure JSON array (do not include markdown code blocks like ```json) of objects, each with exact keys: " +
                    "\"title\" (string), \"company\" (string), \"location\" (string), \"type\" (string, e.g. Full-time, Remote), " +
                    "\"salary\" (string), \"matchPercentage\" (number between 70 and 98), \"description\" (string, summary of role), " +
                    "\"techStack\" (array of strings, key technologies). Return ONLY this pure JSON array, do not include any other text.";

            Map<String, Object> textPart = Map.of("text", prompt);
            Map<String, Object> parts = Map.of("parts", List.of(textPart));
            Map<String, Object> contents = Map.of("contents", List.of(parts));
            String requestBody = mapper.writeValueAsString(contents);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

            String responseStr = restTemplate.postForObject(fullUrl, entity, String.class);
            JsonNode rootNode = mapper.readTree(responseStr);
            String aiResponseText = rootNode.path("candidates").get(0).path("content").path("parts").get(0).path("text").asText();

            int startIdx = aiResponseText.indexOf("[");
            int endIdx = aiResponseText.lastIndexOf("]");
            if (startIdx != -1 && endIdx != -1 && endIdx > startIdx) {
                aiResponseText = aiResponseText.substring(startIdx, endIdx + 1);
            } else {
                aiResponseText = aiResponseText.replace("```json", "").replace("```", "").trim();
            }

            return mapper.readTree(aiResponseText);
        } catch (Exception e) {
            // Fallback list of jobs if AI fails
            try {
                String fallbackJson = "[\n" +
                        "  {\n" +
                        "    \"title\": \"Senior Full Stack Engineer\",\n" +
                        "    \"company\": \"HireNova CloudSync\",\n" +
                        "    \"location\": \"San Francisco, CA\",\n" +
                        "    \"type\": \"Full-time\",\n" +
                        "    \"salary\": \"$135,000 - $160,000\",\n" +
                        "    \"matchPercentage\": 95,\n" +
                        "    \"description\": \"Lead development on web application architectures using React.js and Express.js with robust scaling pipelines.\",\n" +
                        "    \"techStack\": [\"React.js\", \"Express.js\", \"MongoDB\", \"TypeScript\"]\n" +
                        "  },\n" +
                        "  {\n" +
                        "    \"title\": \"MERN Stack Developer\",\n" +
                        "    \"company\": \"Innovate Labs\",\n" +
                        "    \"location\": \"Remote (USA)\",\n" +
                        "    \"type\": \"Remote\",\n" +
                        "    \"salary\": \"$110,000 - $130,000\",\n" +
                        "    \"matchPercentage\": 88,\n" +
                        "    \"description\": \"Design user-centric scalable microservices and build clean light interfaces utilizing React.js.\",\n" +
                        "    \"techStack\": [\"Node.js\", \"React.js\", \"MongoDB\", \"Express.js\"]\n" +
                        "  }\n" +
                        "]";
                return mapper.readTree(fallbackJson);
            } catch (Exception ex) {
                throw new RuntimeException("AI search parsing failed: " + e.getMessage());
            }
        }
    }
}