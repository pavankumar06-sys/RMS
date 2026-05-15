package com.example.RTS_PRO.dto;

public class CandidateFlagResponseDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;

    private Long jobId;

    private boolean multiJobActive;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Long getJobId() { return jobId; }
    public void setJobId(Long jobId) { this.jobId = jobId; }

    public boolean isMultiJobActive() { return multiJobActive; }
    public void setMultiJobActive(boolean multiJobActive) {
        this.multiJobActive = multiJobActive;
    }
}