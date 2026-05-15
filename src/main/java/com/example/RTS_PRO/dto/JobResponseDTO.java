// package com.example.RTS_PRO.dto;

// import java.util.List;

// public class JobResponseDTO {

//     private Long id;
//     private String title;
//     private String account;
//     private String team;
//     private String status;
//     private String positions;
//     private String createdDate;
//     private List<String> skills;

//     public Long getId() { return id; }
//     public void setId(Long id) { this.id = id; }

//     public String getTitle() { return title; }
//     public void setTitle(String title) { this.title = title; }

//     public String getAccount() { return account; }
//     public void setAccount(String account) { this.account = account; }

//     public String getTeam() { return team; }
//     public void setTeam(String team) { this.team = team; }

//     public String getStatus() { return status; }
//     public void setStatus(String status) { this.status = status; }

//     public String getPositions() { return positions; }
//     public void setPositions(String positions) { this.positions = positions; }

//     public String getCreatedDate() { return createdDate; }
//     public void setCreatedDate(String createdDate) { this.createdDate = createdDate; }

//     public List<String> getSkills() { return skills; }
//     public void setSkills(List<String> skills) { this.skills = skills; }
// }

package com.example.RTS_PRO.dto;

import java.util.List;

public class JobResponseDTO {

    private Long id;
    private String title;
    private String account;
    private String team;
    private String status;
    private String positions;      // ✅ "2/5 filled"
    private String createdDate;
    private String owner;          // ✅ SHOWN IN UI
    private List<String> skills;

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

    public String getPositions() { return positions; }
    public void setPositions(String positions) { this.positions = positions; }

    public String getCreatedDate() { return createdDate; }
    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }

    public String getOwner() { return owner; }
    public void setOwner(String owner) { this.owner = owner; }

    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }
}