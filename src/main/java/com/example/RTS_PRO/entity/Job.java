package com.example.RTS_PRO.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String account;
    private String team;
   
    
    private String status;          // active / closed
    private int totalPositions; 
    private String owner;    // ✅ TOTAL POSITIONS
       
    private String createdDate;

    @ElementCollection
    @CollectionTable(
        name = "job_skills",
        joinColumns = @JoinColumn(name = "job_id")
    )
    @Column(name = "skill")
    private List<String> skills;

    // ✅ Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAccount() { return account; }
    public void setAccount(String account) { this.account = account; }

    public String getTeam() { return team; }
    public void setTeam(String team) { this.team = team; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    
public int getTotalPositions() { return totalPositions; }
    public void setTotalPositions(int totalPositions) {
        this.totalPositions = totalPositions;
    }

    
 public String getOwner() { return owner; }
    public void setOwner(String owner) { this.owner = owner; }


    public String getCreatedDate() { return createdDate; }
    public void setCreatedDate(String createdDate) { this.createdDate = createdDate; }

    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }
}

