package com.example.RTS_PRO.dto;

public class AdminInfoRequestDTO {

    private String adminRole;
    private String position;
    private String companyName;
    private String website;
    private String phone;
    private String address;

    public String getAdminRole() { return adminRole; }
    public void setAdminRole(String adminRole) { this.adminRole = adminRole; }

    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
}
