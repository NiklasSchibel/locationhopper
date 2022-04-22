package de.neuefische.backend.placesmap;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/places")
public class PlaceController {

    private final PlaceService placeService;

    public PlaceController(PlaceService placeService) {
        this.placeService = placeService;
    }

    @GetMapping
    public List<Place> getAllPlaces(){
        return placeService.getAll();
    }

    @GetMapping(value = "/{type}")
    public List<Place> getPlacesByType(@PathVariable("type") String type){
        return placeService.getPlacesByType(type);
    }

    @PostMapping
    public Place createPlaces(@RequestBody PlaceDTO placeDTO){
        return placeService.createPlace(placeDTO);
    }

    @DeleteMapping("/{id}")
    public void deletePlace(@PathVariable String id) {
        placeService.deletePlace(id);
    }
}