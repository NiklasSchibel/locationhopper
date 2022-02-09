package de.neuefische.backend.repositories;

import de.neuefische.backend.models.AnimalData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface AnimalRepository extends MongoRepository <AnimalData, String> {
    Optional<AnimalData> findById(String id);
}
