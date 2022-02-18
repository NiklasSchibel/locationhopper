package de.neuefische.backend.repositories;

import de.neuefische.backend.models.ResultsData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ResultsRepository extends MongoRepository<ResultsData, String> {
    Optional<ResultsData> findById(String id);
}
