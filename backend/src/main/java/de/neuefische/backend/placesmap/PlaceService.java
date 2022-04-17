package de.neuefische.backend.placesmap;


import de.neuefische.backend.BackendApplication;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PlaceService {

    private static final Log LOG = LogFactory.getLog(BackendApplication.class);
    private final PlaceRepo placeRepo;

    public PlaceService(PlaceRepo placeRepo) {
        this.placeRepo = placeRepo;
    }

    public List<Place> getAll() {
        LOG.info("Places have been fetched from Backend: "+ LocalDateTime.now());
        return placeRepo.findAll();
    }


    public Place createPlace(@Validated PlaceDTO data) {
        final Place place = Place.newPlace(LocalDateTime.now(), data.getLat(), data.getLng());

        LOG.info("New Place created...");
        LOG.info("Creation Date: { " + LocalDateTime.now() + " }");
        LOG.info("Latitude: { " + place.getLat() + " }");
        LOG.info("Longitude: { " + place.getLng() + " }");
        return placeRepo.insert(place);

    }

    public void deletePlace(String id) {
        if(placeRepo.existsById(id)){
            placeRepo.deleteById(id);
        }
    }
}
