package com.narmahi.jobportal.models;

import java.util.List;

public class MatchResult {
    private int matchPercentage;
    private List<String> pros;
    private List<String> cons;

    // Default Constructor
    public MatchResult() {}

    // Getters and Setters
    public int getMatchPercentage() { return matchPercentage; }
    public void setMatchPercentage(int matchPercentage) { this.matchPercentage = matchPercentage; }

    public List<String> getPros() { return pros; }
    public void setPros(List<String> pros) { this.pros = pros; }

    public List<String> getCons() { return cons; }
    public void setCons(List<String> cons) { this.cons = cons; }
}