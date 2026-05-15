// package com.example.RTS_PRO.dto;

// import java.util.List;

// public class JobRequestDTO {

//     private String title;
//     private String account;
//     private String team;
//     private int positions;
//     private List<String> skills;

//     public String getTitle() { return title; }
//     public void setTitle(String title) { this.title = title; }

//     public String getAccount() { return account; }
//     public void setAccount(String account) { this.account = account; }

//     public String getTeam() { return team; }
//     public void setTeam(String team) { this.team = team; }

//     public int getPositions() { return positions; }
//     public void setPositions(int positions) { this.positions = positions; }

//     public List<String> getSkills() { return skills; }
//     public void setSkills(List<String> skills) { this.skills = skills; }
// }


package com.example.RTS_PRO.dto;

import java.util.List;

public class JobRequestDTO {

    private String title;
    private String account;
    private String team;
    private int positions;          // ✅ TOTAL POSITIONS
    private List<String> skills;
    private String owner;


    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAccount() { return account; }
    public void setAccount(String account) { this.account = account; }

    public String getTeam() { return team; }
    public void setTeam(String team) { this.team = team; }

    public int getPositions() { return positions; }
    public void setPositions(int positions) { this.positions = positions; }

    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }

    public String getOwner() { return owner; }
    public void setOwner(String owner) { this.owner = owner; }
}
