# AI Job Search & ATS Match Portal

A premium, state-of-the-art career optimization platform. It utilizes a **Spring Boot backend** and a **Next.js React frontend** integrated with the **Google Gemini Pro API** to run advanced ATS matching algorithms, keyword optimization audits, and compatibility scoring.

The ATS analyzer is styled in a breathtaking, glassmorphic dark-mode dashboard interface designed to maximize UX and deliver deep technical career metrics.

---

## 🌟 Key Features

* **Real-time ATS Optimizer**: Benchmark resumes against exact job postings.
* **Flexible Gemini Integration**: Connect your API Key seamlessly across environments.
* **Robust Multi-line JSON Serialization**: Custom mapping eliminates request/response parsing exceptions when working with long documents or newlines.
* **Bypassable MongoDB Auto-Configuration**: The Spring Boot backend starts immediately out-of-the-box without requiring a local database connection.

---

## ⚙️ Configuration & API Setup

The Spring Boot backend reads your Gemini API credentials dynamically using properties injection. You can connect your Gemini key in **two ways**:

### Option A: Environment Variable (Recommended)
Set the `GEMINI_API_KEY` environment variable in your terminal, OS settings, or IDE run configurations before launching the backend:
```bash
# Windows (PowerShell)
$env:GEMINI_API_KEY="your_actual_gemini_api_key_here"

# Linux / macOS
export GEMINI_API_KEY="your_actual_gemini_api_key_here"
```

### Option B: Local YAML File
You can directly edit the backend configuration file located at:
`backend/src/main/resources/application.yml`
```yaml
gemini:
  api:
    key: "your_actual_gemini_api_key_here"
```

---

## 🚀 How to Run the Platform

### 1. Start the Spring Boot Backend
Ensure you have **Java 17 (or newer)** installed:
1. Open the `/backend` directory in your favorite IDE (IntelliJ IDEA, Eclipse, or VS Code).
2. Run the main class `com.narmahi.jobportal.JobPortalApplication` directly.
3. The server will launch on `http://localhost:8080` with public endpoints accessible via CORS.

*(Note: The startup will bypass MongoDB connections to ensure immediate, zero-config availability).*

### 2. Start the Next.js Frontend
Ensure you have **Node.js** installed:
1. Open a terminal and navigate to the `/frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the standard dependencies:
   ```bash
   npm install
   ```
3. Launch the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the premium interface at:
   `http://localhost:3000/ats-checker`

---

## 🎨 Premium UI / UX Elements

* **Glassmorphic Darkspace Panels**: Deep backdrop blurs (`backdrop-blur-xl`), translucent borders, and subtle radial gradient glows.
* **Radial Score Visualizer**: Glowing indicators that adjust colors dynamically (Green for High, Orange for Mid, Rose for Critical Gaps).
* **Skeleton Loading Screen**: Pulsing status indicators that keep users visually engaged while the AI is analyzing the match profile.
* **File Drag-and-Drop Reader**: Instantly reads raw `.txt`, `.md`, and `.json` files directly in the browser to populate the ATS parser.