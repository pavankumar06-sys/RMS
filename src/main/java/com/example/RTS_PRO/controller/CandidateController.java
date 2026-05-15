

package com.example.RTS_PRO.controller;

import com.example.RTS_PRO.entity.Candidate;
import com.example.RTS_PRO.repository.CandidateRepository;
import com.example.RTS_PRO.service.CandidateService;
import org.apache.poi.ss.usermodel.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@RequestMapping("/api/candidates")
@CrossOrigin
public class CandidateController {

    private final CandidateService service;
    private final CandidateRepository repository;

    public CandidateController(CandidateService service,
                               CandidateRepository repository) {
        this.service = service;
        this.repository = repository;
    }

    /* ✅ CREATE */
    @PostMapping
    public Candidate create(@RequestBody Candidate candidate) {
        return service.createCandidate(candidate);
    }

    /* ✅ READ */
    @GetMapping
    public List<Candidate> getAll() {
        return service.getAllCandidates();
    }

    /* ✅ UPDATE */
    @PutMapping("/{id}")
    public Candidate update(@PathVariable Long id,
                            @RequestBody Candidate candidate) {
        return service.updateCandidate(id, candidate);
    }

    /* ✅ DELETE */
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteCandidate(id);
    }

    /* ✅ EXCEL UPLOAD (NULL‑SAFE, HEADER‑BASED) */
    @PostMapping("/upload")
    public List<Candidate> uploadExcel(@RequestParam("file") MultipartFile file)
            throws Exception {

        Workbook workbook = WorkbookFactory.create(file.getInputStream());
        Sheet sheet = workbook.getSheetAt(0);

        Map<String, Integer> headerMap = mapHeaders(sheet.getRow(0));
        List<Candidate> validCandidates = new ArrayList<>();

        for (int i = 1; i <= sheet.getLastRowNum(); i++) {

            Row row = sheet.getRow(i);
            if (row == null) continue;

            // ✅ EMAIL (ONLY REQUIRED)
            String email = getCellValue(row, headerMap.get("associate email id"));
            if (email == null || email.isBlank()) continue;
            if (repository.existsByEmail(email)) continue;

            Candidate c = new Candidate();
            c.setEmail(email);

            // ✅ OPTIONAL FIELDS
            c.setFirstName(getCellValue(row, headerMap.get("first name")));
            c.setLastName(getCellValue(row, headerMap.get("last name")));
            c.setPhone(getCellValue(row, headerMap.get("phone")));
            c.setGrade(defaultValue(getCellValue(row, headerMap.get("local_grade")), "A4"));
            c.setType(defaultValue(getCellValue(row, headerMap.get("practice / type / ngt")), "Bench"));

            String groupId = getCellValue(row, headerMap.get("group_id"));
            c.setGroupId(groupId == null || groupId.isBlank()
                    ? generateGroupId()
                    : groupId);

            String skills = getCellValue(row, headerMap.get("skills"));
            if (skills != null && !skills.isBlank()) {
                c.setSkills(Arrays.stream(skills.split(","))
                                  .map(String::trim)
                                  .toList());
            }

            validCandidates.add(c);
        }

        workbook.close();
        return repository.saveAll(validCandidates);
    }

    /* ================= HELPERS ================= */

    private Map<String, Integer> mapHeaders(Row headerRow) {
        Map<String, Integer> map = new HashMap<>();
        for (Cell cell : headerRow) {
            map.put(cell.getStringCellValue().trim().toLowerCase(),
                    cell.getColumnIndex());
        }
        return map;
    }

    private String getCellValue(Row row, Integer index) {
        if (index == null) return null;
        Cell cell = row.getCell(index);
        if (cell == null) return null;

        return switch (cell.getCellType()) {
            case STRING -> cell.getStringCellValue().trim();
            case NUMERIC -> String.valueOf((long) cell.getNumericCellValue());
            default -> null;
        };
    }

    private String defaultValue(String value, String def) {
        return value == null || value.isBlank() ? def : value;
    }

    private String generateGroupId() {
        return "0000" + (new Random().nextInt(9000) + 1000);
    }
}