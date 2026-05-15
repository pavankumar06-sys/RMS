// package com.example.RTS_PRO.repository;

// import com.example.RTS_PRO.entity.Job;
// import org.springframework.data.jpa.repository.JpaRepository;

// public interface JobRepository extends JpaRepository<Job, Long> {
// }

package com.example.RTS_PRO.repository;

import com.example.RTS_PRO.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {

   List<Job> findByTitleIgnoreCaseAndAccountIgnoreCaseAndTeamIgnoreCase(
    String title,
    String account,
    String team
);
}
