// package com.example.RTS_PRO.entity;

// import jakarta.persistence.*;
// import java.util.List;

// @Entity
// @Table(
//     name = "candidates",
//     uniqueConstraints = {
//         @UniqueConstraint(columnNames = "email"),
//         @UniqueConstraint(columnNames = "groupId")
//     }
// )
// public class Candidate {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     private String groupId;

//     @Column(nullable = false, unique = true)
//     private String email;

//     private String phone;

//     private String firstName;
//     private String lastName;
//     private String position;
//     private String grade;
//     private String type;

//     @ElementCollection
//     @CollectionTable(
//         name = "candidate_skills",
//         joinColumns = @JoinColumn(name = "candidate_id")
//     )
//     private List<String> skills;

//     /* ✅ GETTERS & SETTERS */

//     public Long getId() { return id; }
//     public void setId(Long id) { this.id = id; }

//     public String getGroupId() { return groupId; }
//     public void setGroupId(String groupId) { this.groupId = groupId; }

//     public String getEmail() { return email; }
//     public void setEmail(String email) { this.email = email; }

//     public String getPhone() { return phone; }
//     public void setPhone(String phone) { this.phone = phone; }

//     public String getFirstName() { return firstName; }
//     public void setFirstName(String firstName) { this.firstName = firstName; }

//     public String getLastName() { return lastName; }
//     public void setLastName(String lastName) { this.lastName = lastName; }

//     public String getPosition() { return position; }
//     public void setPosition(String position) { this.position = position; }

//     public String getGrade() { return grade; }
//     public void setGrade(String grade) { this.grade = grade; }

//     public String getType() { return type; }
//     public void setType(String type) { this.type = type; }

//     public List<String> getSkills() { return skills; }
//     public void setSkills(List<String> skills) { this.skills = skills; }
// }


package com.example.RTS_PRO.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(
    name = "candidates",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = "email"),
        @UniqueConstraint(columnNames = "groupId")
    }
)
public class Candidate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String groupId;

    @Column(nullable = false, unique = true)
    private String email;

    private String phone;

    private String firstName;
    private String lastName;
    private String position;
    private String grade;
    private String type;

    @Column(name = "job_id")        // ✅ ADD THIS
    private Long jobId;

    @ElementCollection
    @CollectionTable(
        name = "candidate_skills",
        joinColumns = @JoinColumn(name = "candidate_id")
    )
    private List<String> skills;

    /* ✅ GETTERS & SETTERS */

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getGroupId() { return groupId; }
    public void setGroupId(String groupId) { this.groupId = groupId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }

    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Long getJobId() { return jobId; }        // ✅
    public void setJobId(Long jobId) { this.jobId = jobId; }

    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }
}