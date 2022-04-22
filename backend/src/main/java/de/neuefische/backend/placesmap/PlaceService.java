package de.neuefische.backend.placesmap;


import de.neuefische.backend.BackendApplication;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;

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

    public List<Place> getPlacesByType(String type) {
        LOG.info("Places by Type:" + type +" have been fetched from Backend: "+ LocalDateTime.now());
        return placeRepo.findAllByPlaceType(type.toUpperCase(Locale.ROOT));
    }

    public Place createPlace(@Validated PlaceDTO data) {
        final Place place = Place.newPlace(LocalDateTime.now(), data.getLat(), data.getLng(), data.getPlaceType(), data.getPlaceName());

        LOG.info("New Place created...");
        LOG.info("Creation Date: { " + LocalDateTime.now() + " }");
        LOG.info("Latitude: { " + place.getLat() + " }");
        LOG.info("Longitude: { " + place.getLng() + " }");
        LOG.info("PlaceType: { " + place.getPlaceType() + " }");
        LOG.info("PlaceName: { " + place.getPlaceName() + " }");
        return placeRepo.insert(place);

    }

    public void deletePlace(String id) {
        LOG.info("location: " + id + " has been deleted!");
        if(placeRepo.existsById(id)){
            placeRepo.deleteById(id);
        }
    }


}
