package de.neuefische.backend.placesmap;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepo extends MongoRepository<Place, String> {

//    List<Place> findAllByUsername(String username);

}